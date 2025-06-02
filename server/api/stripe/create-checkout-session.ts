import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const stripe = await useServerStripe(event);
    const body = await readBody(event)
    const { priceId,payType } = body

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            //price: 'price_1QxtlXBwLqowaPCgf0oSHvOq',
            price: priceId,
            quantity: 1
          },
        ],
        mode: payType, // This should be 'payment' or 'subscription'
        success_url: config.public.baseUrl + '/success',
        cancel_url: config.public.baseUrl + '/cancel',
      })
  
      if (!session.url) {
        throw new Error('No URL returned from Stripe')
      }
  
      let response = {
          code: 200,
          message: 'ok',
          data: {
            url: session.url
          }
      }
      return response;
    } catch (error) {
      console.error('Error creating stripe checkout session:', error)
      return createError({ statusCode: 500, message: 'Error creating checkout session' })
    }
  });
  