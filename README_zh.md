

🌍 *[English](README.md) ∙ [简体中文](README_zh.md) ∙ [日本語](README_ja.md) *

# NuxtPro:开源的Nuxt SaaS一站式出海模板 | 多语言、支付和友好SEO（Nuxt3）

 NuxtPro是一款基于Nuxt3的开源企业级SaaS模板，预集成全球支付网关（Stripe/Cream）、谷歌OAuth、多语言路由和SEO优化工具。为开发人员提供SSR/SSG支持，开箱即用。

- [👉 源码地址](https://github.com/PennyJoly/NuxtPro)

🚀 如果你在寻找基于Nuxt框架，且自带后台管理系统，前后端兼容友好的一站式出海Saas模板，不妨看看NuxtPro的商业版?(https://nuxtpro.com). NuxtPro商业版让您1小时快速上线MVP，验证需求，节省大量研发时间。NuxtPro专注于小而美的产品，让您有更多时间花在推广和运营上，搭配上主流的AI产品，一人公司即可高效地创收。

👉 NuxtPro 商业版 $40 刀 限时早鸟折扣券 -> https://x.com/PennyJoly



## ✨ 产品特点
高度集成当下最流行的开源技术栈方案，让您的出海创收历程仅需片刻

- 🌐 NuxtJs3 -> 开源的全栈的适用于生产环境的 NuxtJs 框架.
- 🌈 Vue 3 -> 用于 Web 和原生用户界面的开源代码库.
- 🔒 BetterAuth -> 简单高效的开源认证授权框架.
- ✅ Shadcn UI -> 用于构建现代风格界面的开源UI组件.
- 🎨 Tailwindcss -> 用于快速 UI 开发的开源 CSS 框架.
- 🔍 DrizzleOrm -> 用于 Node.js 和 TypeScript 的开源下一代数据库工具包.
- 💰 Stripe -> 最好、最安全的在线支付服务.
- 💳 Creem -> 为 SaaS 和独立开发者提供稳定的的在线支付服务.
- ✉️ Resend -> 为开发者们打造的现代邮件API服务.
- 👄 i18n -> 开源且轻松地为Nuxt项目添加国际化支持,再小的语种都不怕.
- 💨 plausible -> 开源且隐私友好的Google Analytics 替代品.
- 🌙 vite-pwa -> 基于vite的开源且零配置的PWA框架.


## 🚀 如何快速开始项目

1. 克隆仓库地址:
```bash
git clone https://github.com/PennyJoly/NuxtPro
```

2. 安装依赖:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. 将“.env.example”克隆，重命名为".env",填入对应内容:
```bash
cp .env.example .env
```

4. 启动运行服务:
```bash
npm run dev
```

浏览器里输入 http://localhost:3000 查看启动的NuxtPro应用.

## ★ 最小启动项配置 ★

```
NODE_ENV=development
NUXT_PUBLIC_ENV=development 
PORT=3000
NUXT_PUBLIC_BASE_URL=http://localhost:3000 # 你的基础服务地址
NUXT_RESEND_API_KEY= # 你的resend密钥
DATABASE_URL= # mysql数据库连接地址
BETTER_AUTH_SECRET=B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM # 你的32位betterAuth授权密钥 例如：B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM
BETTER_AUTH_URL=http://localhost:3000 # 你的基础服务地址  

同时在尚未注册好stripe的前提下，最小启动请注释掉index.vue里的这两行即可
# const { stripe,loadStripe  } = useClientStripe();
# stripe.value = await loadStripe(config.public.stripe.key);
```

## ⚙️ 配置


1. i18n 配置
   - 在 `i18n/lang/` 下新增或者修改语言文件
   - 在 `i18n/config.ts` 中配置新增/修改的语言文件
   - 在 `i18n、index.ts` 中加载`i18n/lang/` 文件实现国际化


## 🔍 SEO 支持

内置全面的SEO功能：
   - 服务器端渲染和静态生成
   - 自动生成sitemap.xml
   - robots.txt配置
   - 元数据优化
   - 支持Open Graph
   - 多语言SEO支持

## 🌐 选择收款方式

进入 `.env` 文件完成以下内容：
```
PAYMENT_METHOD=   # 选择你想要的收款方式：1、stripe;2、paddle(暂未支持);3、creem
```

## 💰 Stripe全球化支付支持

进入 `.env` 文件完成以下内容：
```
NUXT_STRIPE_SECRET_KEY= # 你的stripe密钥. 详情见 :https://stripe.com
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= #你的stripe公钥
NUXT_STRIPE_WEBHOOK_SECRET= # 你的stripe webhook 密钥
```

## 💳 独立开发者提供稳定的的在线支付服务支持

进入 `.env` 文件完成以下内容：
```
NUXT_CREEM_API_KEY= # 你的creem申请的API密钥. 详情见:https://www.creem.io
NUXT_PUBLIC_CREEM_URL= # 你的creem基础url 示例: https://test-api.creem.io
NUXT_CREEM_WEBHOOK_SECRET= # 你的creem的webhook密钥
```

## ✉️ 邮件API服务支持

进入 `.env` 文件完成以下内容：
```
NUXT_RESEND_API_KEY= # 你的resend申请的api密钥. 详情见 :https://resend.com
```

## 🔍 mysql连接支持

进入 `.env` 文件完成以下内容：
```
DATABASE_URL= # 你的mysql连接地址. 示例：mysql://root:password.@localhost:3306/nuxtpro
```

## 📊 数据可视化分析

进入 `.env` 文件完成以下内容：
```
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # 你的plausible域名 举例: nuxtpro.com  details for :https://nuxt.com/modules/plausible
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # 你的plausible请求地址
```

## 🌙 ip地址信息获取支持

进入 `.env` 文件完成以下内容：
```
IPINFO_TOKEN= # 你的ipinfo申请的token .详情见: https://ipinfo.io
```

## 🔒 BetterAuth认证授权支持

进入 `.env` 文件完成以下内容：
```
BETTER_AUTH_SECRET= # 你的 better auth 32位随机密钥. 详情见 : https://www.better-auth.com/docs/installation
BETTER_AUTH_URL= # 你的 better auth 访问Url  示例: http://localhost:3000 
GOOGLE_CLIENT_ID= # 你的 google clinet id 示例: xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= # 你的 google client 密钥. 详情见 :https://www.better-auth.com/docs/authentication/google   https://console.cloud.google.com/apis/dashboard
GITHUB_CLIENT_ID= # 你的 github client id. 详情见 : https://www.better-auth.com/docs/authentication/github   https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # 你的 github client 密钥 
```

## 🌙 谷歌搜索控制台支持

进入 `.env` 文件完成以下内容：
```
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE= # 你的 google搜索控制台验证码. 详情见: https://search.google.com/search-console/about
```

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PennyJoly/NuxtPro)

## 📄 许可证

Apache 2.0 License

## 🤝 贡献

欢迎提交问题和拉取请求！

## 关于作者

Hey，这里是Kevin，一个别具一格的ENTJ-H型独立开发者，不受约束的反骨的社恐(社交型恐怖分子)。
现在很喜欢这样一句话，也一直在贯彻始终："想多了，全是问题;做多了,全是答案"。Just do it~我也会将我的经验与大家一同分享，一同成长进步。
2025NuxtPro将专注于个人产品出海，提供一站式个人产品出海解决方案，贯彻打造一人公司。

如需咨询和了解出海内容，请联系 c2500338766@icloud.com

- [Github](https://github.com/PennyJoly)
- [Twitter/X](https://x.com/PennyJoly)

<a href="https://buymeacoffee.com/c2500338765" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/indiemakerkevin)