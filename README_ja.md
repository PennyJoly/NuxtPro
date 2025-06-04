

🌍 *[English](README.md) ∙ [简体中文](README_zh.md) ∙ [日本語](README_ja.md) *

# NuxtPro: オープンソースのNuxt SaaSワンストップ海外展開テンプレート | 多言語、決済、SEOフレンドリー（Nuxt3）

 NuxtProは、Nuxt3をベースにしたオープンソースのエンタープライズ級SaaSテンプレートで、グローバル決済ゲートウェイ（Stripe/Cream）、Google OAuth、多言語ルーティング、SEO最適化ツールがプリインストールされています。開発者向けにSSR/SSGサポートを提供し、すぐに利用可能です。

- [👉 ソースコード](https://github.com/PennyJoly/NuxtPro)

🚀 Nuxtフレームワークをベースにしており、バックエンド管理システムが付属し、フロントエンドとバックエンドの互換性に優れたワンストップの海外展開SaaSテンプレートをお探しなら、NuxtProの商用版(https://nuxtpro.com) をぜひご覧ください。NuxtPro商用版は、1時間でMVPを迅速に立ち上げ、ニーズを検証し、開発時間を大幅に節約できます。NuxtProは、小さくても美しい製品に焦点を当てており、プロモーションと運用により多くの時間を費やすことができます。主流のAI製品と組み合わせることで、一人会社でも効率的に収益を上げることができます。

👉 NuxtPro 商用版 $40 期間限定早期割引クーポン -> https://x.com/PennyJoly

## ✨ 製品の特徴
現在最も人気のあるオープンソース技術スタックソリューションを高度に統合し、海外での収益化の道のりをわずかな時間で実現します。

- 🌐 NuxtJs3 -> オープンソースのフルスタックで、本番環境に適したNuxtJsフレームワーク。
- 🌈 Vue 3 -> Webおよびネイティブユーザーインターフェース用のオープンソースコードライブラリ。
- 🔒 BetterAuth -> シンプルで効率的なオープンソース認証・認可フレームワーク。
- ✅ Shadcn UI -> モダンなスタイルのインターフェースを構築するためのオープンソースUIコンポーネント。
- 🎨 Tailwindcss -> 迅速なUI開発のためのオープンソースCSSフレームワーク。
- 🔍 DrizzleOrm -> Node.jsおよびTypeScript用のオープンソース次世代データベースツールキット。
- 💰 Stripe -> 最高かつ最も安全なオンライン決済サービス。
- 💳 Creem -> SaaSおよび独立開発者向けに安定したオンライン決済サービスを提供。
- ✉️ Resend -> 開発者向けに作られたモダンなメールAPIサービス。
- 👄 i18n -> Nuxtプロジェクトに国際化サポートを簡単に追加できるオープンソース。どんな小さな言語でも対応可能。
- 💨 plausible -> オープンソースでプライバシーに配慮したGoogle Analyticsの代替品。
- 🌙 vite-pwa -> viteベースのオープンソースでゼロコンフィグのPWAフレームワーク。

## 🚀 プロジェクトを素早く開始する方法

1. リポジトリをクローン:
```bash
git clone https://github.com/PennyJoly/NuxtPro
```

2. 依存関係をインストール:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. `.env.example` を複製し、`.env` にリネームし、必要な情報を入力してください:
```bash
cp .env.example .env
```

4. サービスを起動:
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスし、起動したNuxtProアプリケーションを確認してください。

## ★ 最小起動設定 ★

```
NODE_ENV=development
NUXT_PUBLIC_ENV=development 
PORT=3000
NUXT_PUBLIC_BASE_URL=http://localhost:3000 # あなたのベースURL
NUXT_RESEND_API_KEY= # あなたのResend APIキー
DATABASE_URL= # MySQLデータベース接続URL
BETTER_AUTH_SECRET=B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM # あなたの32文字のBetterAuth認証キー 例: B3E4q0JYr3pRpQkwvxo9jfOLz41TKrNM
BETTER_AUTH_URL=http://localhost:3000 # あなたのベースURL  

Stripeの登録がまだ完了していない場合、最小起動のためにindex.vue内の以下の2行をコメントアウトしてください
# const { stripe,loadStripe  } = useClientStripe();
# stripe.value = await loadStripe(config.public.stripe.key);
```

## ⚙️ 設定


1. i18n 設定
   - `i18n/lang/` 以下に言語ファイルを追加または変更します。
   - `i18n/config.ts` で追加/変更した言語ファイルを構成します。
   - `i18n/index.ts` で `i18n/lang/` ファイルを読み込み、国際化を実現します。


## 🔍 SEO サポート

組み込みの包括的なSEO機能：
   - サーバーサイドレンダリングと静的生成
   - sitemap.xml の自動生成
   - robots.txt の設定
   - メタデータ最適化
   - Open Graph のサポート
   - 多言語SEOサポート

## 🌐 支払い方法の選択

`.env` ファイルで以下を完了してください:
```
PAYMENT_METHOD=   # ご希望の支払い方法を選択してください：1. Stripe; 2. Paddle (現在未対応); 3. Creem
```

## 💰 Stripeグローバル決済サポート

`.env` ファイルで以下を完了してください:
```
NUXT_STRIPE_SECRET_KEY= # あなたのStripeシークレットキー。詳細は: https://stripe.com を参照してください
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # あなたのStripe公開キー
NUXT_STRIPE_WEBHOOK_SECRET= # あなたのStripe Webhookシークレットキー
```

## 💳 独立開発者向けの安定したオンライン決済サービスサポート

`.env` ファイルで以下を完了してください:
```
NUXT_CREEM_API_KEY= # あなたのCreem申請APIキー。詳細は: https://www.creem.io を参照してください
NUXT_PUBLIC_CREEM_URL= # あなたのCreemベースURL。例: https://test-api.creem.io
NUXT_CREEM_WEBHOOK_SECRET= # あなたのCreem Webhookシークレットキー
```

## ✉️ メールAPIサービスサポート

`.env` ファイルで以下を完了してください:
```
NUXT_RESEND_API_KEY= # あなたのResend申請APIキー。詳細は: https://resend.com を参照してください
```

## 🔍 MySQL接続サポート

`.env` ファイルで以下を完了してください:
```
DATABASE_URL= # あなたのMySQL接続アドレス。例：mysql://root:password.@localhost:3306/nuxtpro
```

## 📊 データ可視化分析

`.env` ファイルで以下を完了してください:
```
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # あなたのPlausibleドメイン。例: nuxtpro.com。詳細は: https://nuxt.com/modules/plausible を参照してください
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # あなたのPlausibleリクエストアドレス
```

## 🌙 IPアドレス情報取得サポート

`.env` ファイルで以下を完了してください:
```
IPINFO_TOKEN= # あなたのipinfo申請トークン。詳細は: https://ipinfo.io を参照してください
```

## 🔒 BetterAuth認証・認可サポート

`.env` ファイルで以下を完了してください:
```
BETTER_AUTH_SECRET= # あなたのBetterAuth 32桁のランダムキー。詳細は: https://www.better-auth.com/docs/installation を参照してください
BETTER_AUTH_URL= # あなたのBetterAuthアクセスURL。例: http://localhost:3000
GOOGLE_CLIENT_ID= # あなたのGoogleクライアントID。例: xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= # あなたのGoogleクライアントシークレットキー。詳細は: https://www.better-auth.com/docs/authentication/google https://console.cloud.google.com/apis/dashboard を参照してください
GITHUB_CLIENT_ID= # あなたのGitHubクライアントID。詳細は: https://www.better-auth.com/docs/authentication/github https://github.com/settings/developers を参照してください
GITHUB_CLIENT_SECRET= # あなたのGitHubクライアントシークレットキー
```

## 🌙 Google Search Console サポート

`.env` ファイルで以下を完了してください:
```
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE= # あなたのGoogle Search Console検証コード。詳細は: https://search.google.com/search-console/about を参照してください
```

## ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PennyJoly/NuxtPro)

## 📄 ライセンス

Apache 2.0 License

## 🤝 貢献

問題提起やプルリクエストをお待ちしております！

## 作者について

こんにちは、Kevinです。型にはまらないENTJ-H型の独立開発者で、自由奔放な反骨精神を持つ人見知り（社交テロリスト）です。
最近、ある言葉をとても気に入っており、常に実践しています。「考えすぎると問題ばかり、行動すればすべてが答えになる」。Just do it~ 私の経験を皆さんと共有し、共に成長していきたいと思っています。
2025年、NuxtProは個人プロダクトの海外展開に注力し、ワンストップの個人プロダクト海外展開ソリューションを提供し、一人会社を構築することを徹底します。

海外展開に関するご相談や詳細については、c2500338766@icloud.com までご連絡ください。

- [Github](https://github.com/PennyJoly)
- [Twitter/X](https://x.com/PennyJoly)

<a href="https://buymeacoffee.com/c2500338765" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/indiemakerkevin)