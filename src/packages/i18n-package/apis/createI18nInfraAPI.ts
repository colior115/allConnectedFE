import i18n from '../../../i18n/i18n';
import type { I18nInfraAPI } from './i18nInfraAPI';

const RTL_LANGS = new Set(['he', 'ar']);

const applyDir = (lang: string) => {
  document.documentElement.dir = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
};

applyDir(i18n.language);

export const createI18nInfraAPI = (): I18nInfraAPI => ({
  async changeLanguage(lang) {
    await i18n.changeLanguage(lang);
    applyDir(lang);
  },

  getLanguage() {
    return i18n.language;
  },
});
