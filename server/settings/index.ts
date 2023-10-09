import { RESTDataSource } from "@apollo/datasource-rest";
import { Lang } from "../types/settings";
import inMemorySettingsStore from "./store/in-memory-settings.store";

class SettingsAPI extends RESTDataSource {
  async getLanguage(): Promise<Lang> {
    return {
      lang: inMemorySettingsStore.getLang()
    };
  }

  async changeLanguage(lang: string): Promise<Lang> {
    inMemorySettingsStore.update(lang);

    return {
      lang
    };
  }
}

export default SettingsAPI;
