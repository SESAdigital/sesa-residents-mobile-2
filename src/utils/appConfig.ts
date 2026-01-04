const baseURL = {
  prod: 'https://sesa-resident-g8wmo.ondigitalocean.app/api',

  dev: 'https://sesa-residents.intbithq.com/api',
};

export default Object.freeze({
  APP_PIN_LENGTH: 4,

  // APP_BACKEND_BASE_URL: baseURL.prod,

  APP_BACKEND_BASE_URL: baseURL.dev,

  APP_MMKV_ENCRYPTION_KEY: 'sesa-residents-2026',

  APP_IMAGE_COMPRESS_VALUE: 0.2,

  APP_ICON:
    'https://res.cloudinary.com/dzgqixmj3/image/upload/v1752076853/sesa/ic_launcher_foreground_gcrsii.png',
});
