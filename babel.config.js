module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // We'll add back 'react-native-reanimated/plugin' after it's installed
    ],
  };
}; 