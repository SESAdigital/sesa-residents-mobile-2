import { PersistStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import appConfig from '@src/utils/appConfig';

const id = appConfig.APP_MMKV_ENCRYPTION_KEY;

const storage = createMMKV({
  id: `${id}-storage`,
  encryptionKey: id,
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.remove(name);
  },
};

export const transformMMKVStore = <T>(): PersistStorage<Readonly<T>> => {
  return {
    setItem: (name, value) => {
      return storage.set(name, JSON.stringify(value));
    },
    getItem: name => {
      const value = storage.getString(name);
      if (value) return JSON.parse(value);
      else return null;
    },
    removeItem: name => {
      return storage.remove(name);
    },
  };
};
