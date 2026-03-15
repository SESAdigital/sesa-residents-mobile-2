type EnvType = 'PRODUCTION' | 'DEV';

interface Variant {
  APP_BACKEND_BASE_URL: string;
  APP_PAYSTACK_KEY: string;
  APP_WEBSITE_URL: string;
}

const variants: Record<EnvType, Variant> = {
  DEV: {
    APP_BACKEND_BASE_URL: 'https://sesa-residents.intbithq.com/api',
    APP_PAYSTACK_KEY: 'pk_test_ef9246e1ed7f1d0a51b77cb7a81c5b93f70e40ca',
    APP_WEBSITE_URL: 'https://sesa-website-dev.netlify.app',
  },

  PRODUCTION: {
    APP_BACKEND_BASE_URL: 'https://sesa-resident-g8wmo.ondigitalocean.app/api',
    APP_PAYSTACK_KEY: 'pk_live_2d2fcc60d9061ee4b9fcb941ae0f40e6ef1f4c54',
    APP_WEBSITE_URL: 'https://trysesa.com',
  },
};

const { APP_BACKEND_BASE_URL, APP_PAYSTACK_KEY, APP_WEBSITE_URL } =
  variants?.DEV;

export default Object.freeze({
  APP_PAYSTACK_KEY,

  APP_WEBSITE_URL,

  APP_BACKEND_BASE_URL,

  APP_PIN_LENGTH: 4,

  APP_MMKV_ENCRYPTION_KEY: 'sesa-residents-2026',

  APP_MIMIMUM_ELECTRICITY_PURCHAGE_AMOUNT: 1_000,

  APP_IMAGE_COMPRESS_VALUE: 0.2,

  APP_NAME: 'SESA',

  NAIRA_SYMBOL: '₦',

  APP_SUPPORT_EMAIL: 'support@trysesa.com',

  APP_ICON:
    'https://res.cloudinary.com/dzgqixmj3/image/upload/v1752076853/sesa/ic_launcher_foreground_gcrsii.png',
});
