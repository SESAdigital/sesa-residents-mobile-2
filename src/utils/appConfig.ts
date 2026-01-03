const baseURL = {
  prod: 'https://sesa-security-9sy2v.ondigitalocean.app/api/GuardMobile',

  dev: 'https://sesa-guard.intbithq.com/api/GuardMobile',
};

export default Object.freeze({
  APP_PIN_LENGTH: 4,

  // APP_BACKEND_BASE_URL: baseURL.prod,

  APP_BACKEND_BASE_URL: baseURL.dev,

  APP_GOOGLE_MAP_KEY: 'AIzaSyALBtM7DxfA0rfmEZka-0OryDtg58kZHu4',

  APP_MMKV_ENCRYPTION_KEY: 'sesa-resident',

  APP_NAME: 'SESA',

  APP_TERMS_AND_CONDITIONS_URL: 'https://trysesa.com/terms-of-service',

  APP_PRIVACY_POLICY_URL: 'https://trysesa.com/privacy-policy',

  APP_CONTACT_MAIL: 'support@trysesa.com',

  APP_IMAGE_COMPRESS_VALUE: 0.2,

  APP_ICON:
    'https://res.cloudinary.com/dzgqixmj3/image/upload/v1752076853/sesa/ic_launcher_foreground_gcrsii.png',
});
