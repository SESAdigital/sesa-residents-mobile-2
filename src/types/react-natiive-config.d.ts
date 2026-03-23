declare module 'react-native-config' {
  export interface NativeConfig {
    APP_CUSTOM_FLAVOUR?: string;
    APP_BACKEND_BASE_URL?: string;
    APP_PAYSTACK_KEY?: string;
    APP_WEBSITE_URL?: string;
    APP_MMKV_ENCRYPTION_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
