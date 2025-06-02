
// 框架 国际化文件
import zh_cn from './lang/zh_cn';
import en_us from './lang/en_us';
import ja from './lang/ja';

// 加载 lang 文件夹下的国际化
export const loadLang = (modules: Record<string, any>) => {
	let messages: { [key: string]: string } = {};

	Object.keys(modules).forEach(module => {
		Object.assign(messages, { ...modules[module].default });
	})

  return messages;
}

export const messages: { [key: string]: any } = {
  'zh-CN': {
    langName: '简体中文',
    ...loadLang(zh_cn),
  },
  'en-US': {
    langName: 'English',
    ...loadLang(en_us),
  },
  'JP': {
    langName: '日本語',
    ...loadLang(ja),
  }
}