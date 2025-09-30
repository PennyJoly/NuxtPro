import { defineEventHandler, readBody, readRawBody } from 'h3'
import crypto from 'crypto'

// 用于存储已处理的事件ID，防止重复处理
// 在生产环境中应该使用Redis或数据库来存储
const processedEvents = new Set<string>()

export default defineEventHandler(async (event) => {
  try {
    const rawBody = await readRawBody(event)
    const signature = event.node.req.headers['bagelpay-signature'] as string
    const timestamp = event.node.req.headers['timestamp'] as string
    
    if (!rawBody || !signature || !timestamp) {
      console.error('Missing required parameters for signature verification')
      return { status: 'error', message: 'Missing required parameters' }
    }
    
    const timestampBuffer = Buffer.from(timestamp, 'utf8')
    const dotBuffer = Buffer.from('.', 'utf8')
    const rawBodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody)
    const body_payload = Buffer.concat([timestampBuffer, dotBuffer, rawBodyBuffer])
    
    // console.log('body_payload (bytes):', body_payload)
    // console.log('signature:', signature)
    // console.log('rawBody (bytes):', rawBody)
    // console.log('timestamp:', timestamp)

    if (!verifySignature(body_payload, signature)) {
      console.error('Invalid webhook signature')
      return { status: 'error', message: 'Invalid signature' }
    }
    
    const bodyString = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody)
    const body = JSON.parse(bodyString)
    
    // 4. 检查是否已处理过该事件（幂等性检查）
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
function verifySignature(payload: Buffer, signature: string): boolean {
  // 从环境变量获取 webhook 密钥
  const webhookSecret = process.env.NUXT_BAGELPAY_WEBHOOK_SECRET   
  
  if (!webhookSecret || !signature) {
    return false
  }
  
  // 计算 HMAC 签名 - 直接使用传入的Buffer payload
  const hmac = crypto.createHmac('sha256', webhookSecret)
  const computedSignature = hmac.update(payload).digest('hex')
  
  // console.log('computedSignature:', computedSignature)
  // console.log('receivedSignature:', signature)
  
  // 使用时间安全的比较方法
  return crypto.timingSafeEqual(
    Buffer.from(computedSignature),
    Buffer.from(signature)
  )
}

// 处理 webhook 事件的具体业务逻辑
async function processWebhookEvent(payload: any) {
  try {
    const eventType = payload.event_type
    
    console.log(`Processing ${eventType} event:`, payload)
    
    // 根据事件类型处理不同的业务逻辑
    switch (eventType) {
      case 'checkout.completed':
        await handleCheckoutCompleted(payload)
        break
      case 'checkout.failed':
        await handleCheckoutFailed(payload)
        break
      case 'subscription.trialing':
        await handleSubscriptionTrialing(payload)
        break
      case 'subscription.paid':
        await handleSubscriptionPaid(payload)
        break
      case 'subscription.canceled':
        await handleSubscriptionCancelled(payload)
        break
      case 'refund.created':
        await handleRefundCreated(payload)
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
  // console.log('handleCheckoutCompleted',payload)
  try {
    const userName = payload.object.customer?.email
    const userEmail = payload.object.customer?.email
    const paymentId = payload.object.payment_id
    const productPlan = payload.object.product.name
    const productDescription = payload.object.product.description
    const productPrice = (payload.object.product.price).toFixed(2)
    const productCurrency = payload.object.product.currency
    const metaData = payload.object.metadata

    // console.log('userName:', userName)
    // console.log('userEmail:', userEmail)
    // console.log('paymentId:', paymentId)
    // console.log('productPlan:', productPlan)
    // console.log('productDescription:', productDescription)
    // console.log('productPrice:', productPrice)
    // console.log('productCurrency:', productCurrency)
    // console.log('metaData:', metaData)

    if (!userEmail) {
      console.error('No customer email found in payload')
      return
    }

    // 根据地区选择模板
    let templateSuffix = 'us'

    const response = await $fetch('/api/resend/send', {
      method: 'POST',
      body: {
        email: userEmail,
        template: `purchase-thanks-${templateSuffix}`, // 使用带后缀的模板名称
        data: {
          name: userName,
          payment_id: paymentId,
          product_plan: productPlan,
          product_description: productDescription,
          amount: productPrice,
          currency: productCurrency,
          purchase_date: new Date().toLocaleDateString('zh-CN'),
          access_url: 'https://nuxtPro.com',
          promo_code: 'NuxtPro2025WishYouBest'
        }
      }
    })

    console.log('Welcome email sent:', response)
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

async function handleCheckoutFailed(payload: any) {
  // 实现支付失败的处理逻辑，单次付费、首次订阅、订阅续费支付失败时，会收到该消息
  console.log('handleCheckoutFailed')
}

async function handleSubscriptionTrialing(payload: any) {
  // 实现订阅开始试用期的逻辑
  console.log('handleSubscriptionTrialing')
}

async function handleSubscriptionPaid(payload: any) {
  // 实现订阅支付的处理逻辑，此时可以给予用户相应你的产品的使用权限
  console.log('handleSubscriptionPaid')
}

async function handleSubscriptionCancelled(payload: any) {
  // 实现订阅取消的处理逻辑
  console.log('handleSubscriptionCancelled')
}

async function handleRefundCreated(payload: any) {
  // 实现处理退款的逻辑
  console.log('handleRefundCreated')
}
