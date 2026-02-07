module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '.',
            message:
              'Please use "./index" or explicit paths to avoid circular dependency resolution issues.',
          },
        ],
      },
    ],
  },
};
