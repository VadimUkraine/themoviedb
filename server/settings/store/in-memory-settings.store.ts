import { DEFAULT_LANG } from "../constants";

const inMemorySettingsStore = {
  language: DEFAULT_LANG,

  getLang: (): string => {
    return inMemorySettingsStore.language;
  },

  update: (lang: string): void => {
    inMemorySettingsStore.language = lang;
  }
};

export default inMemorySettingsStore;
