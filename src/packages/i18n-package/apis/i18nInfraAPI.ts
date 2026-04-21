import type { SlotKey } from 'repluggable';

export const I18nInfraAPI: SlotKey<I18nInfraAPI> = {
  name: 'I18n Infra API',
  public: true,
  layer: 'INFRA',
};

export interface I18nInfraAPI {
  changeLanguage(lang: string): Promise<void>;
  getLanguage(): string;
}
