

🌍 *[English](README.md) ∙ [简体中文](README_zh.md) ∙ [日本語](README_ja.md)*

# NuxtPro: Open Source Nuxt SaaS All-in-One Template for Global Expansion | Multilingual, Payment, and SEO Friendly (Nuxt3)

NuxtPro is an open-source enterprise-level SaaS template based on Nuxt3, pre-integrated with global payment gateways (Stripe/Cream), Google OAuth, multilingual routing, and SEO optimization tools. It provides developers with SSR/SSG support, ready to use out of the box.

- [👉 Source Code](https://github.com/PennyJoly/NuxtPro)

🚀 If you are looking for a Nuxt framework-based, all-in-one SaaS template with a built-in admin system and front-end/back-end compatibility, consider the commercial version of NuxtPro? (https://nuxtpro.com). The commercial version of NuxtPro allows you to launch an MVP in just 1 hour, validate your needs, and save a lot of development time. NuxtPro focuses on small and beautiful products, giving you more time to spend on promotion and operations. With mainstream AI products, a one-person company can efficiently generate revenue.

👉 NuxtPro Commercial Version $40 Limited Time Early Bird Discount Coupon -> https://x.com/PennyJoly

## ✨ Product Features
Highly integrated with the most popular open-source technology stack solutions, making your journey to global revenue generation just a moment away.

- 🌐 NuxtJs3 -> An open-source full-stack NuxtJs framework suitable for production environments.
- 🌈 Vue 3 -> An open-source library for web and native user interfaces.
- 🔒 BetterAuth -> A simple and efficient open-source authentication and authorization framework.
- ✅ Shadcn UI -> Open-source UI components for building modern-style interfaces.
- 🎨 Tailwindcss -> An open-source CSS framework for rapid UI development.
- 🔍 DrizzleOrm -> An open-source next-generation database toolkit for Node.js and TypeScript.
- 💰 Stripe -> The best and most secure online payment service.
- 💳 Creem -> A stable online payment service for SaaS and independent developers.
- ✉️ Resend -> A modern email API service built for developers.
- 👄 i18n -> Open-source and easy internationalization support for Nuxt projects, no matter how small the language.
- 💨 plausible -> An open-source and privacy-friendly alternative to Google Analytics.
- 🌙 vite-pwa -> An open-source and zero-configuration PWA framework based on Vite.

## 🚀 How to Quickly Start the Project

1. Clone the repository:
```bash
git clone https://github.com/PennyJoly/NuxtPro
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Visit http://localhost:3000 to view your nuxtpro application.

## ⚙️ Configuration

1. i18n config
   - Add or modify language files in `i18n/lang/`
   - Configure added/modified language files in `i18n/config.ts`
   - Load `i18n/lang/` files in `i18n/index.ts` to implement internationalization


## 🔍 SEO Optimization

Built-in comprehensive SEO features:
   - Server-side rendering and static generation
   - Automatic sitemap.xml generation
   - robots.txt configuration
   - Optimized metadata
   - Open Graph support
   - Multilingual SEO support

## 🌐 select payment method

Configure the following in your `.env` file:
```
PAYMENT_METHOD=   # select your payment：1、stripe;2、paddle(not support);3、creem
```

## 💰 Stripe Global Payment Support

Configure the following in your `.env` file:
```
NUXT_STRIPE_SECRET_KEY= # your stripe secret key. details for :https://stripe.com
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # your stripe public key
NUXT_STRIPE_WEBHOOK_SECRET= # your stripe webhook secret key
```

## 💳 Stable Online Payment Service Support for Independent Developers

Configure the following in your `.env` file:
```
NUXT_CREEM_API_KEY= # your creem api key. details for :https://www.creem.io
NUXT_PUBLIC_CREEM_URL= # your creem base url e.g: https://test-api.creem.io
NUXT_CREEM_WEBHOOK_SECRET= # your creem webhook secret
```

## ✉️ Email API Service Support

Configure the following in your `.env` file:
```
NUXT_RESEND_API_KEY= # your resend api key. details for :https://resend.com
```

## 🔍 MySQL Connection Support

Configure the following in your `.env` file:
```
DATABASE_URL= # your mysql url e.g: mysql://root:password.@localhost:3306/nuxtpro
```

## 📊 Data Visualization Analysis

Configure the following in your `.env` file:
```
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # your plausible domain e.g: nuxtpro.com  details for :https://nuxt.com/modules/plausible
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # your plausible request url 
```

## 🌙 IP Address Information Support

Configure the following in your `.env` file:
```
IPINFO_TOKEN= # your ipinfo token . details for : https://ipinfo.io/ to register
```

## 🔒 BetterAuth Authentication and Authorization Support

Configure the following in your `.env` file:
```
BETTER_AUTH_SECRET= # your better auth 32 secret. details for : https://www.better-auth.com/docs/installation
BETTER_AUTH_URL= # your better auth url  e.g: http://localhost:3000 
GOOGLE_CLIENT_ID= # your google clinet id e.g: xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= # your google client secret. details for :https://www.better-auth.com/docs/authentication/google   https://console.cloud.google.com/apis/dashboard
GITHUB_CLIENT_ID= # your github client id. details for : https://www.better-auth.com/docs/authentication/github   https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # your github client secret 
```

## 🌙 Google Search Console Support

Configure the following in your `.env` file:
```
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE= # your google search console verification code. details for: https://search.google.com/search-console/about
```

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PennyJoly/NuxtPro)

## 📄 License

Apache 2.0 License

## 🤝 Contributing

Issues and Pull Requests are welcome!

## About the Author

Hi, I'm Kevin, a unique ENTJ-H type independent developer, an unconstrained rebel and a social butterfly (socially fearless). 
I really like this saying and have been consistently practicing it: "Overthinking leads to problems; taking action leads to solutions." Just do it~ I will share my experiences with everyone and grow together. 
In 2025, NuxtPro will focus on personal product globalization, providing one-stop solutions for personal product internationalization, fully committed to building a one-person company.

For consulting and learning more about globalization, please contact c2500338766@icloud.com

- [Github](https://github.com/PennyJoly)
- [Twitter/X](https://x.com/PennyJoly)

<a href="https://buymeacoffee.com/c2500338765" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/indiemakerkevin)