module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
        },
      },
    ],

    // PLEASE LET THIS ALWAYS BE LAST
    'react-native-worklets/plugin'
  ],
};