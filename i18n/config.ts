import zh_cn from './lang/zh_cn';
import en_us from './lang/en_us';
import ja from './lang/ja';

export default defineI18nConfig(() => ({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zh_cn,
    'en-US': en_us,
    'JP': ja
  }
}))