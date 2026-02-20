type EnvType = 'PRODUCTION' | 'DEV';

interface Variant {
  baseURL: string;
  paystackKEy: string;
}

const variants: Record<EnvType, Variant> = {
  DEV: {
    baseURL: 'https://sesa-residents.intbithq.com/api',
    paystackKEy: 'pk_test_ef9246e1ed7f1d0a51b77cb7a81c5b93f70e40ca',
  },

  PRODUCTION: {
    baseURL: 'https://sesa-resident-g8wmo.ondigitalocean.app/api',
    paystackKEy: 'pk_live_2d2fcc60d9061ee4b9fcb941ae0f40e6ef1f4c54',
  },
};

const { baseURL, paystackKEy } = variants?.DEV;

export default Object.freeze({
  APP_PIN_LENGTH: 4,

  // APP_BACKEND_BASE_URL: baseURL.prod,

  APP_BACKEND_BASE_URL: baseURL,

  APP_MMKV_ENCRYPTION_KEY: 'sesa-residents-2026',

  APP_MIMIMUM_ELECTRICITY_PURCHAGE_AMOUNT: 1_000,

  APP_IMAGE_COMPRESS_VALUE: 0.2,

  APP_PAYSTACK_KEY: paystackKEy,

  APP_NAME: 'SESA',

  NAIRA_SYMBOL: '₦',

  APP_SUPPORT_EMAIL: 'support@trysesa.com',

  APP_ICON:
    'https://res.cloudinary.com/dzgqixmj3/image/upload/v1752076853/sesa/ic_launcher_foreground_gcrsii.png',
});
