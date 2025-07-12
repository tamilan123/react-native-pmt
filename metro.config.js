// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: [
      // Keep the original ones (minus 'svg' if you're transforming SVGs to components)
      ...defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    ],
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'svg', // Needed if using react-native-svg-transformer
    ],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // if using SVGs as components
  },
};

module.exports = mergeConfig(defaultConfig, config);
