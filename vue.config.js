module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.optimization.delete('splitChunks');
  },
  configureWebpack: config => {
    let getConfig = config;
    getConfig = Object.assign(getConfig, {
      entry: process.env.NODE_ENV == 'development' ? './src/main.ts' : './src/plugin/index.ts',
      output: {
        ...getConfig.output,
        filename: 'Impzipper.js',
        library: 'Impzipper',
        libraryTarget: 'umd',
      },
    });
  },
  // 选项...
}