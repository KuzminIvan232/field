module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts'],
      alias: {
        '@components': './src/components',
        '@hooks': './src/hooks',
        '@navigation': './src/navigation',
        '@utils': './src/utils',
        '@store': './src/store',
        '@services': './src/services',
        '@interfaces': './src/interfaces',
        '@localization': './src/localization',
        '@icons': './src/assets/icons',
        '@images': './src/assets/images',
      },
    }],
    'react-native-reanimated/plugin',
  ],
};
