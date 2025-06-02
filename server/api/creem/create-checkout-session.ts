export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { productId } = body


  try {
    const response = await $fetch(config.public.creem.url + '/v1/checkouts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': config.creem.apiKey
      },
      body: {
        product_id: productId,
        //success_url: config.public.baseUrl + '/success'
      }
    })

    if (!response.checkout_url) {
      throw new Error('No URL returned from Creem')
    }

    //console.log('creem response....',response)
    return {
      code: 200,
      message: 'ok',
      data: {
        url: response.checkout_url 
      }
    }
  } catch (error) {
    console.error('Error creating creem checkout session:', error)
    return createError({ statusCode: 500, message: 'Error creating checkout session' })
  }
})
