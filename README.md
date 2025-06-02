

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

1. Basic Setup
   - Edit `config/site.ts` for website information
   - Update icons and logo in `public/`
   - Configure `app/sitemap.ts` for sitemap
   - Update `app/robots.ts` for robots.txt

2. i18n 配置
   - Add/modify language files in `i18n/messages/`
   - Configure supported languages in `i18n/routing.ts`
   - Set up i18n routing in `middleware.ts`
   - Create pages under `app/[locale]/`
   - Use the `Link` component from `i18n/routing.ts` instead of Next.js default


## 🔍 SEO Optimization

Built-in comprehensive SEO features:
   - Server-side rendering and static generation
   - Automatic sitemap.xml generation
   - robots.txt configuration
   - Optimized metadata
   - Open Graph support
   - Multilingual SEO support

## 📊 Data Analytics

Enter `.env` file to complate ：
```
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # your plausible domain e.g: nuxtpro.com  details for :https://nuxt.com/modules/plausible
NUXT_PUBLIC_PLAUSIBLE_API_HOST=  your plausible request url 
```

## One-Click Deploy

<!-- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/weijunext/nextjs-15-starter&project-name=&repository-name=nextjs-15-starter&demo-title=Nextjs15Starter&demo-description=Nextjs%2015%20starter.&demo-url=https://nextforge.dev&demo-image=https://nextforge.dev/og.png) -->

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