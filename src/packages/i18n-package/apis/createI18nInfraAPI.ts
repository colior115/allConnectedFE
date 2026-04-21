import i18n from '../../../i18n/i18n';
import type { I18nInfraAPI } from './i18nInfraAPI';

export const createI18nInfraAPI = (): I18nInfraAPI => ({
  async changeLanguage(lang) {
    await i18n.changeLanguage(lang);
  },

  getLanguage() {
    return i18n.language;
  },
});
