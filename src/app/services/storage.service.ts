import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export enum StorageKey {
  FOOD_LIST = 'food_list',
  DARK_MODE = 'dark',
  LANGUAGE = 'lang',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setObject(key: string, object: any) {
    await Storage.set({
      key,
      value: JSON.stringify(object)
    });
  }

  async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async setItem(key: StorageKey, value: string) {
    await Storage.set({
      key,
      value
    });
  }

  async getItem(key: string) {
    const item = await Storage.get({ key });
    return item.value || null;
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async keys() {
    return await Storage.keys();
  }

  async clear() {
    await Storage.clear();
  }
}
