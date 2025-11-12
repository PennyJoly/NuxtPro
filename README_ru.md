🌍 *[English](README.md) ∙ [简体中文](README_zh.md) ∙ [日本語](README_ja.md) · [Русский язык](README_ru.md) *

# NuxtPro: Открытый шаблон SaaS на базе Nuxt для выхода на зарубежные рынки | Мультиязычность, платежи и SEO (Nuxt3)

NuxtPro — это открытый корпоративный шаблон SaaS на базе Nuxt3, с предустановленными глобальными платежными шлюзами (Stripe/Cream), Google OAuth, мультиязычной маршрутизацией и инструментами SEO-оптимизации. Предоставляет поддержку SSR/SSG, готов к использованию «из коробки».

- [👉 Исходный код](https://github.com/PennyJoly/NuxtPro)

🚀 Если вы ищете шаблон SaaS на базе Nuxt с административной панелью и совместимостью фронтенда и бэкенда, обратите внимание на коммерческую версию NuxtPro (https://nuxtpro.com). С ней вы сможете запустить MVP за 1 час, проверить гипотезу и сэкономить время на разработке. NuxtPro ориентирован на компактные продукты, чтобы вы могли больше времени уделять продвижению и развитию. В сочетании с современными AI-продуктами даже один человек может эффективно зарабатывать.

👉 NuxtPro коммерческая версия $40 — купон ранней пташки: https://x.com/PennyJoly


## ✨ Особенности продукта
Высокоинтегрированный современный open-source стек для быстрого выхода на зарубежные рынки

- 🌐 NuxtJs3 -> Открытый полнофункциональный фреймворк NuxtJs для продакшена.
- 🌈 Vue 3 -> Открытая библиотека для веб- и нативных интерфейсов.
- 🔒 BetterAuth -> Простой и эффективный open-source фреймворк аутентификации и авторизации.
- ✅ Shadcn UI -> Open-source UI-компоненты для современного дизайна.
- 🎨 Tailwindcss -> Открытый CSS-фреймворк для быстрой разработки UI.
- 🔍 DrizzleOrm -> Open-source ORM нового поколения для Node.js и TypeScript.
- 💰 Stripe -> Лучший и самый безопасный онлайн-платежный сервис.
- 💳 BagelPay -> Стабильные онлайн-платежи для SaaS и инди-разработчиков.
- 💳 Creem -> Стабильные онлайн-платежи для SaaS и инди-разработчиков.
- ✉️ Resend -> Современный email API для разработчиков.
- 👄 i18n -> Легкая интеграция мультиязычности в Nuxt-проекты.
- 💨 plausible -> Open-source альтернатива Google Analytics с заботой о приватности.
- 🌙 vite-pwa -> Open-source PWA-фреймворк на базе vite без настройки.


## 🚀 Быстрый старт проекта

1. Клонируйте репозиторий:
```bash
git clone https://github.com/PennyJoly/NuxtPro
```

2. Установите зависимости:
```bash
npm install
# или
yarn
# или
pnpm install
```

3. Скопируйте файл ".env.example", переименуйте в ".env" и заполните:
```bash
cp .env.example .env
```

4. Запустите сервис:
```bash
npm run dev
```

Откройте http://localhost:3000 в браузере для просмотра NuxtPro.

## ★ Минимальная конфигурация для запуска ★

```
NODE_ENV=development
NUXT_PUBLIC_ENV=development 
PORT=3000
NUXT_PUBLIC_BASE_URL=http://localhost:3000 # Ваш базовый адрес
NUXT_RESEND_API_KEY= # Ваш ключ resend
DATABASE_URL= # Адрес подключения к MySQL
BETTER_AUTH_SECRET=B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM # Ваш 32-символьный ключ betterAuth, например: B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM
BETTER_AUTH_URL=http://localhost:3000 # Ваш базовый адрес

Если вы еще не зарегистрировали stripe, закомментируйте эти две строки в index.vue:
# const { stripe,loadStripe  } = useClientStripe();
# stripe.value = await loadStripe(config.public.stripe.key);
```

## 🌈 Примеры интерфейса
![1749050152589](https://github.com/user-attachments/assets/76403671-3700-47f8-a6a7-123a42fdf92f)
![image](https://github.com/user-attachments/assets/2ea38a96-6231-4419-b9db-9312492c5a2c)
![image](https://github.com/user-attachments/assets/788682ca-db63-486a-b82d-4bc8814386db)
![image](https://github.com/user-attachments/assets/aee19765-0b75-46de-9585-1f6d408a7ae5)
![image](https://github.com/user-attachments/assets/60d9f4ed-d36b-465e-80ba-fe286552ed6c)
![image](https://github.com/user-attachments/assets/b026fa3e-b789-4cf6-8271-037bc4faf0a1)


## ⚙️ Конфигурация


1. Настройка i18n
   - Добавьте или измените языковые файлы в `i18n/lang/`
   - Укажите новые/изменённые языки в `i18n/config.ts`
   - Загрузите файлы из `i18n/lang/` в `i18n/index.ts` для мультиязычности


## 🔍 SEO поддержка

Встроенные функции SEO:
   - Серверный рендеринг и статическая генерация
   - Автоматическая генерация sitemap.xml
   - Конфигурация robots.txt
   - Оптимизация метаданных
   - Поддержка Open Graph
   - Мультиязычная SEO-поддержка

## 🌐 Выбор способа оплаты

В файле `.env` укажите:
```
PAYMENT_METHOD=   # Выберите способ оплаты: 1 — stripe; 2 — paddle (пока не поддерживается); 3 — creem
```

## 💰 Глобальные платежи через Stripe

В файле `.env` укажите:
```
NUXT_STRIPE_SECRET_KEY= # Ваш секретный ключ stripe. Подробнее: https://stripe.com
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Ваш публичный ключ stripe
NUXT_STRIPE_WEBHOOK_SECRET= # Ваш webhook-ключ stripe
```

## 💳 Стабильные онлайн-платежи для инди-разработчиков

В файле `.env` укажите:
```
NUXT_CREEM_API_KEY= # Ваш API-ключ creem. Подробнее: https://www.creem.io
NUXT_PUBLIC_CREEM_URL= # Ваш базовый URL creem, например: https://test-api.creem.io
NUXT_CREEM_WEBHOOK_SECRET= # Ваш webhook-ключ creem
```

## 💳 Stable Online Payment Service Support for Independent Developers

В файле `.env` укажите:
```
NUXT_PUBLIC_BAGELPAY_URL= # Ваш API-ключ bagelPay. Подробнее: https://test.bagelpay.io 
NUXT_BAGELPAY_API_KEY= # Ваш API-ключ bagelPay. Подробнее:
NUXT_BAGELPAY_WEBHOOK_SECRET= # Ваш webhook-ключ creem
```

## ✉️ Поддержка email API

В файле `.env` укажите:
```
NUXT_RESEND_API_KEY= # Ваш API-ключ resend. Подробнее: https://resend.com
```

## 🔍 Подключение к MySQL

В файле `.env` укажите:
```
DATABASE_URL= # Адрес подключения к MySQL. Пример: mysql://root:password.@localhost:3306/nuxtpro
```

## 📊 Аналитика и визуализация данных

В файле `.env` укажите:
```
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # Ваш домен plausible, например: nuxtpro.com. Подробнее: https://nuxt.com/modules/plausible
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # Ваш адрес API plausible
```

## 🌙 Получение информации об IP-адресе

В файле `.env` укажите:
```
IPINFO_TOKEN= # Ваш токен ipinfo. Подробнее: https://ipinfo.io
```

## 🔒 Поддержка BetterAuth

В файле `.env` укажите:
```
BETTER_AUTH_SECRET= # Ваш 32-символьный секретный ключ better auth. Подробнее: https://www.better-auth.com/docs/installation
BETTER_AUTH_URL= # Ваш URL better auth, например: http://localhost:3000
GOOGLE_CLIENT_ID= # Ваш Google client id, например: xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= # Ваш Google client secret. Подробнее: https://www.better-auth.com/docs/authentication/google   https://console.cloud.google.com/apis/dashboard
GITHUB_CLIENT_ID= # Ваш GitHub client id. Подробнее: https://www.better-auth.com/docs/authentication/github   https://github.com/settings/developers
GITHUB_CLIENT_SECRET= # Ваш GitHub client secret
```

## 🌙 Поддержка Google Search Console

В файле `.env` укажите:
```
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE= # Ваш код верификации Google Search Console. Подробнее: https://search.google.com/search-console/about
```

## Однокнопочное деплой

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PennyJoly/NuxtPro)

## 📄 Лицензия

Apache 2.0 License

## 🤝 Вклад

Добро пожаловать к вопросам и pull request!

## Об авторе

Привет, это Кевин — независимый разработчик, типичный ENTJ-H, немного бунтарь и интроверт.
Сейчас мне нравится одна фраза, которой я всегда следую: «Много думаешь — много проблем; много делаешь — много ответов». Just do it~ Я делюсь своим опытом, чтобы расти вместе с вами.
В 2025 году NuxtPro сосредоточится на решениях для индивидуального выхода на зарубежные рынки и поддержке концепции «компания из одного человека».

По вопросам и консультациям пишите на c2500338766@icloud.com

- [Github](https://github.com/PennyJoly)
- [Twitter/X](https://x.com/PennyJoly)

## kevin‘s other product

- [Remover.plus - Free sora2 watermark remover](https://remover.plus)
- [FreeTempMail - opensource free temp mail](https://mail.aitre.cc)
- [NuxtDir - discover powerful ai website worldwide](https://nuxtdir.com)
- [CheapGpt - ai llm gateway,¥1 = $1](https://ai.linktre.cc)
- [linktre-tools - indie maker tools](https://github.com/PennyJoly/linktre-tools)

<a href="https://buymeacoffee.com/c2500338765" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/indiemakerkevin)
