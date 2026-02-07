module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
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
