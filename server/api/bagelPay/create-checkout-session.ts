import { auth } from '~/lib/auth/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { productId } = body

  // 获取当前用户会话
  const session = await auth.api.getSession({
    headers: event.headers
  })

  // 检查用户是否已登录
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not authenticated'
    })
  }

  // 打印body和用户信息
  console.log('body:', body)
  console.log('user session:', session.user)

  try {
    const response: any = await $fetch(config.public.bagelPay.url + '/api/payments/checkouts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': config.bagelPay.apiKey
      },
      body: {
        product_id: productId,
        success_url: config.public.baseUrl + '/success',
        // When creating the checkout payment page, pass a customer parameter to the gateway to prevent consumers from filling in random email addresses when paying, resulting in the order not being matched to a specific user.
        customer: {
          "email": session.user.email
        },
        // When creating a checkout session you can attach your own custom info (e.g. internal order_id, campaign) in metadata.
        metadata: {
            "source": "website",
            "campaign": "summer_sale",
            "order_id": "put your order id here",
            "user_email": session.user.email,
            "user_id": session.user.id
        }
        // When you receive the webhook after payment, that same metadata comes back so you can update your system.
      }
    })

    if (!response.data.checkout_url) {
      throw new Error('No URL returned from bagelPay')
    }

    //console.log('bagelPay response....',response)
    return {
      code: 200,
      message: 'ok',
      data: {
        url: response.data.checkout_url 
      }
    }
  } catch (error) {
    console.error('Error creating bagelPay checkout session:', error)
    return createError({ statusCode: 500, message: 'Error creating checkout session' })
  }
})
