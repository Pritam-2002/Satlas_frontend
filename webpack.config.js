const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // Add any modules that need to be transpiled here
          'expo-linear-gradient',
        ],
      },
    },
    argv
  );

  // Add any custom webpack config overrides here
  config.resolve.alias = {
    ...config.resolve.alias,
    // Add any aliases if needed
  };

  return config;
}; 