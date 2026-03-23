import Config from 'react-native-config';

export default Object.freeze({
  APP_PAYSTACK_KEY: Config?.APP_PAYSTACK_KEY || '',

  APP_WEBSITE_URL: Config?.APP_WEBSITE_URL || '',

  APP_BACKEND_BASE_URL: Config?.APP_BACKEND_BASE_URL || '',

  APP_MMKV_ENCRYPTION_KEY: Config?.APP_MMKV_ENCRYPTION_KEY || '',

  APP_PIN_LENGTH: 4,

  APP_MIMIMUM_ELECTRICITY_PURCHAGE_AMOUNT: 1_000,

  APP_IMAGE_COMPRESS_VALUE: 0.2,

  APP_NAME: 'SESA',

  NAIRA_SYMBOL: '₦',

  APP_SUPPORT_EMAIL: 'support@trysesa.com',

  APP_ICON:
    'https://res.cloudinary.com/dzgqixmj3/image/upload/v1752076853/sesa/ic_launcher_foreground_gcrsii.png',
});
