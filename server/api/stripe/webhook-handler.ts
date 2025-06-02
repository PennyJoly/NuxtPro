import { defineEventHandler, readRawBody } from 'h3'
import { useServerStripe } from "#stripe/server";
import Stripe from 'stripe';

// 用于存储已处理的事件ID，防止重复处理
// 在生产环境中应该使用Redis或数据库来存储
const processedEvents = new Set<string>()

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  try {
    // 1. 获取原始请求体（Buffer格式）
    const body = await readRawBody(event)
    const signature = event.node.req.headers['stripe-signature'] as string

    // 2. 使用原始body验证签名
    const webhookSecret = process.env.NUXT_STRIPE_WEBHOOK_SECRET
    const stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    // 3. 解析JSON对象用于业务处理
    const payload = stripeEvent.data.object
    
    // 4. 检查是否已处理过该事件（幂等性检查）
    const eventId = payload.id || payload.event_id
    if (!eventId) {
      console.error('Missing event ID in webhook payload')
      return { status: 'error', message: 'Missing event ID' }
    }
    
    if (processedEvents.has(eventId)) {
      console.log(`Event ${eventId} already processed, skipping`)
      return { status: 'success', message: 'Event already processed' }
    }
    
    // 5. 传递原始事件对象给处理函数
    setTimeout(() => processWebhookEvent(stripeEvent,stripe), 0)
    
    // 6. 标记事件为已处理
    processedEvents.add(eventId)
    
    // 设置过期清理（仅适用于内存存储，生产环境应使用Redis TTL）
    setTimeout(() => {
      processedEvents.delete(eventId)
    }, 24 * 60 * 60 * 1000) // 24小时后清理
    
    // 7. 立即返回成功响应
    return { status: 'success', message: 'Webhook received' }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return { status: 'error', message: 'Internal server error' }
  }
})

// 处理 webhook 事件的具体业务逻辑
async function processWebhookEvent(stripeEvent: any,stripe:any) {
  try {
    const eventType = stripeEvent.type
    const eventData = stripeEvent.data.object // 使用Stripe解析后的对象
    
    //console.log(`Processing ${eventType} event:`, stripeEvent)
    
    // 根据事件类型处理不同的业务逻辑
    switch (eventType) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(eventData,stripe) // 传入解析后的数据
        break
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(stripeEvent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(stripeEvent)
        break
      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent)
        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }
    
    console.log(`Successfully processed ${eventType} event`)
  } catch (error) {
    console.error('Error in webhook event processing:', error)
    // 在生产环境中，应该将失败的事件保存到数据库中，以便后续重试
  }
}

// 以下是各种事件处理函数的实现
async function handleCheckoutCompleted(payload: any,stripe:any) {
  // 推荐使用Stripe类型（需安装@stripe/stripe-js类型）
  const session = payload as Stripe.Checkout.Session;
  
  // 获取关联的line items（需要先通过expand参数获取）
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product'] // 展开产品信息
  });

  // 获取第一个产品的详细信息
  const firstItem = lineItems.data[0];
  const product = firstItem?.price?.product as Stripe.Product;
  
  // 获取价格信息
  const price = firstItem?.price as Stripe.Price;
  
  if (!product) {
    console.error('No product information found in session');
    return;
  }

  // 直接使用产品信息（无需额外API调用）
  const productDetails = {
    name: product.name,
    description: product.description,
    price: price.unit_amount,
    currency: price.currency
  };

  // 修正数据获取方式（使用Stripe事件的标准数据结构）
  const userEmail = payload.customer_details?.email
  const userName = payload.customer_details?.name
  const region = payload.customer_details?.address?.country?.toUpperCase()
  const orderId = payload.id
  
  if (!userEmail) {
    console.error('No customer email found in payload')
    return
  }

  // 根据地区选择模板
  let templateSuffix = 'us'
  if (region === 'CN') {
    templateSuffix = 'cn'
  } else if (region === 'HK') {
    templateSuffix = 'hk'
  } else if (region === 'JP') {
    templateSuffix = 'jp'
  }

  const response = await $fetch('/api/resend/send', {
    method: 'POST',
    body: {
      email: userEmail,
      template: `purchase-thanks-${templateSuffix}`, // 使用带后缀的模板名称
      data: {
        name: userName,
        order_id: orderId,
        product_plan: productDetails.name,
        product_description: productDetails.description,
        amount: (productDetails.price/100).toFixed(2),
        currency: productDetails.currency,
        purchase_date: new Date().toLocaleDateString('zh-CN'),
        access_url: 'https://nuxtPro.com',
        promo_code: 'NuxtPro2025WishYouBest',
        region: region
      }
    }
  })

  console.log('Welcome email sent:', response)
}
//详情可参考：https://docs.stripe.com/api/events/types?lang=curl
async function handlePaymentIntentSucceeded(payload: any) {
  // 实现支付成功处理逻辑
  console.log('handlePaymentIntentSucceeded')
}

async function handlePaymentIntentFailed(payload: any) {
  // 实现支付失败的处理逻辑
  console.log('handlePaymentIntentFailed')
}

async function handleSubscriptionCreated(payload: any) {
  // 实现新订阅创建的处理逻辑，此时可发送欢迎邮件
  console.log('handleSubscriptionCreated')
}

async function handleSubscriptionUpdated(payload: any) {
  // 实现订阅状态变更的处理逻辑，同步订阅状态到本地数据库
 
  console.log('handleSubscriptionUpdated')
}

async function handleSubscriptionDeleted(payload: any) {
  // 实现订阅取消或到期的逻辑，关闭订阅相关服务权限
  console.log('handleSubscriptionDeleted')
}


