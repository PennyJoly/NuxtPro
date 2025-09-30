export default defineNuxtConfig({
  app:{
    head:{
      title:'NuxtPro',
      meta:[
        { 
          name: 'google-site-verification', 
          content: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE  // Google Search Console verification code  
        }
      ]
    }
  },
  ssr: true,
  port: process.env.PORT || 3000,
  compatibilityDate: '2024-11-01',  
  devtools: { enabled: true },

  //指定全局css
  css:['~/assets/css/tailwind.css','~/assets/css/fonts.css'],

  //引入tailwindcss
  modules:[
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@unlok-co/nuxt-stripe',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap',
    'nuxt-llms',
    '@nuxtjs/seo'
  ],
  //配置公共seo数据
  site: {
    url: 'https://nuxtpro.com',
    name: 'OpenSource Nuxt SaaS Boilerplate | NuxtPro',
    description: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 1 hour.',
    defaultLocale: 'en',
    enabled: true,
    debug: false,
    indexable: true,
    trailingSlash: false
  },
  //配置结构化数据
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'OpenSource Nuxt SaaS Boilerplate | NuxtPro',
      url: 'https://nuxtpro.com',
      logo: 'https://nuxtpro.com/favicon.ico'
    },
    defaults: true,
    minify: true,
    reactive: false,
    enabled: true,
    debug: false
  },
  //配置robots爬虫抓取协议
  robots: {
    UserAgent: '*',
    Disallow: '/private',
    Allow: '/',
    Sitemap: 'https://nuxtpro.com/sitemap.xml'
  },
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en-US', 'zh-CN','JP'],
    defaultLocale: 'en-US',
    vueI18n: '@@/i18n/config.ts',
  },
  llms: {
    domain: 'https://nuxtpro.com',
    title: 'OpenSource Nuxt SaaS Boilerplate | NuxtPro',
    description: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 3 days.',
    sections: [
      {
        title: 'NuxtPro',
        description: 'NuxtPro is a open source Nuxt3 SaaS Boilerplate, pre-integrated with global payment gateways (Stripe/Cream), Google OAuth, i18n routing, and SEO optimization tools.',
        links: [
          {
            title: 'NuxtPro `s Features',
            description: 'Integrate the most popular open source technology stack to make your entrepreneurial journey just a moment.',
            href: 'https://nuxtpro.com/#features',
          },
          {
            title: 'NuxtPro `s pricing',
            description: 'Pricing plans for enthusiasts and professionals.',
            href: 'https://nuxtpro.com/#pricing',
          },
          {
            title: 'NuxtPro `s blog',
            description: 'Latest news and updates from our team.',
            href: 'https://nuxtpro.com/blog',
          },
          {
            title: 'NuxtPro `s testimonials',
            description: 'What Our Customers Say?.',
            href: 'https://nuxtpro.com/#testimonials',
          },
          {
            title: 'NuxtPro `s faq',
            description: 'the most frequently asked questions.',
            href: 'https://nuxtpro.com/#faq',
          },
          {
            title: 'NuxtPro `s roadmap',
            description: 'Explore our development plans, upcoming features, and share your suggestions for future enhancements.',
            href: 'https://nuxtpro.com/roadmap',
          }
        ]
      }
    ]
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  //运行时全局变量
  runtimeConfig: {
    //此处定义的属性只能在服务端获取到
    // Server
    name: 'jackson',
    environment: process.env.NODE_ENV || 'development',
    sitemap: {
      defaults: {
        changefreq: 'daily',
        priority: 0.8
      }
    },
    stripe: {
      key: process.env.NUXT_STRIPE_SECRET_KEY,
      options: {},
    },
    //creem
    creem:{
      apiKey: process.env.NUXT_CREEM_API_KEY,
      webhookSecret: process.env.NUXT_CREEM_WEBHOOK_SECRET
    },
    //bagelPay
    bagelPay:{
      apiKey: process.env.NUXT_BAGELPAY_API_KEY,
      webhookSecret: process.env.NUXT_BAGELPAY_WEBHOOK_SECRET
    },
    // ipinfo 获取Ip信息
    ipinfoToken: process.env.IPINFO_TOKEN,
    //public中定义的属性既可以在服务端，也可以在客户端获取到
    public: {
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      isServer: true,
      plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
        ignoredHostnames: ['localhost', '127.0.0.1'],
        autoOutboundTracking: true,
        enabled: true,
      },
      //支付方式选择：1、stripe;2、paddle;3、creem
      paymentMethod: process.env.PAYMENT_METHOD,
      // Client
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        options: {},
        manualClientLoad: true
      },
      creem:{
        url: process.env.NUXT_PUBLIC_CREEM_URL
      },
      bagelPay:{
        url: process.env.NUXT_PUBLIC_BAGELPAY_URL
      },
    },
  },
  devServer: {
    host: '0.0.0.0' // 允许所有 IP 访问
  },
  vite: {
    server: {
      allowedHosts: ['nuxtpro.com'] // 允许指定域名
    }
  }
})