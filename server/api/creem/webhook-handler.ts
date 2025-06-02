import { defineEventHandler, readBody } from 'h3'
import crypto from 'crypto'

// 用于存储已处理的事件ID，防止重复处理
// 在生产环境中应该使用Redis或数据库来存储
const processedEvents = new Set<string>()

export default defineEventHandler(async (event) => {
  try {
    // 1. 读取请求体
    const body = await readBody(event)
    // 2. 验证 webhook 签名（假设 Creem 使用 HMAC 签名）
    const signature = event.node.req.headers['creem-signature'] as string
    if (!verifySignature(body, signature)) {
      console.error('Invalid webhook signature')
      return { status: 'error', message: 'Invalid signature' }
    }
    
    // 3. 检查是否已处理过该事件（幂等性检查）
    const eventId = body.id || body.event_id
    if (!eventId) {
      console.error('Missing event ID in webhook payload')
      return { status: 'error', message: 'Missing event ID' }
    }
    
    if (processedEvents.has(eventId)) {
      console.log(`Event ${eventId} already processed, skipping`)
      return { status: 'success', message: 'Event already processed' }
    }
    
    // 4. 异步处理 webhook 事件（不阻塞响应）
    // 注意：在实际生产环境中，应该使用队列系统如 Bull/Bullmq
    setTimeout(() => processWebhookEvent(body), 0)
    
    // 5. 标记事件为已处理
    processedEvents.add(eventId)
    
    // 设置过期清理（仅适用于内存存储，生产环境应使用Redis TTL）
    setTimeout(() => {
      processedEvents.delete(eventId)
    }, 24 * 60 * 60 * 1000) // 24小时后清理
    
    // 6. 立即返回成功响应
    return { status: 'success', message: 'Webhook received' }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return { status: 'error', message: 'Internal server error' }
  }
})

// 验证 webhook 签名
function verifySignature(payload: any, signature: string): boolean {
  // 从环境变量获取 webhook 密钥
  const webhookSecret = process.env.NUXT_CREEM_WEBHOOK_SECRET   
  
  if (!webhookSecret || !signature) {
    return false
  }
  
  // 计算 HMAC 签名
  const hmac = crypto.createHmac('sha256', webhookSecret)
  const computedSignature = hmac.update(JSON.stringify(payload)).digest('hex')
  
  // 使用时间安全的比较方法
  return crypto.timingSafeEqual(
    Buffer.from(computedSignature),
    Buffer.from(signature)
  )
}

// 处理 webhook 事件的具体业务逻辑
async function processWebhookEvent(payload: any) {
  try {
    const eventType = payload.eventType
    
    //console.log(`Processing ${eventType} event:`, payload)
    
    // 根据事件类型处理不同的业务逻辑
    switch (eventType) {
      case 'checkout.completed':
        await handleCheckoutCompleted(payload)
        break
      case 'subscription.active':
        await handleSubscriptionActive(payload)
        break
      case 'subscription.paid':
        await handleSubscriptionPaid(payload)
        break
      case 'subscription.canceled':
        await handleSubscriptionCancelled(payload)
        break
      case 'subscription.expired':
        await handleSubscriptionExpired(payload)
        break
      case 'refund.created':
        await handleRefundCreated(payload)
        break
      case 'subscription.update':
        await handleSubscriptionUpdate(payload)
        break
      case 'subscription.trialing':
        await handleSubscriptionTrialing(payload)
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
async function handleCheckoutCompleted(payload: any) {
  //console.log('handleCheckoutCompleted',payload)
  try {
    const userEmail = payload.object.customer?.email
    const userName = payload.object.customer?.name
    const region = payload.object.customer?.country?.toUpperCase() // 统一转大写
    const orderId = payload.object.id
    const productPlan = payload.object.product.name
    const productDescription = payload.object.product.description
    const productPrice = (payload.object.product.price/100).toFixed(2)
    const productCurrency = payload.object.product.currency

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
          product_plan: productPlan,
          product_description: productDescription,
          amount: productPrice,
          currency: productCurrency,
          purchase_date: new Date().toLocaleDateString('zh-CN'),
          access_url: 'https://nuxtPro.com',
          promo_code: 'NuxtPro2025WishYouBest',
          region: region
        }
      }
    })

    console.log('Welcome email sent:', response)
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

async function handleSubscriptionActive(payload: any) {
  // 实现订阅激活的处理逻辑
  console.log('handleSubscriptionActive')
}

async function handleSubscriptionPaid(payload: any) {
  // 实现订阅支付的处理逻辑，此时可以给予用户相应你的产品的使用权限
  console.log('handleSubscriptionPaid')
}

async function handleSubscriptionCancelled(payload: any) {
  // 实现订阅取消的处理逻辑
  console.log('handleSubscriptionCancelled')
}

async function handleSubscriptionExpired(payload: any) {
  // 实现订阅已过期的处理逻辑 current_end_period已到达，且没有续费
  // 在此阶段可以重试付款，并且只有当状态更改为canceled时，订阅状态才会终止
  console.log('handleSubscriptionExpired')
}

async function handleRefundCreated(payload: any) {
  // 实现处理退款的逻辑
  console.log('handleRefundCreated')
}

async function handleSubscriptionUpdate(payload: any) {
  // 实现订阅更新的逻辑
  console.log('handleSubscriptionUpdate')
}

async function handleSubscriptionTrialing(payload: any) {
  // 实现订阅开始试用期的逻辑
  console.log('handleSubscriptionTrialing')
}
