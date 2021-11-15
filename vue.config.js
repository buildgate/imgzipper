module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['index']
    },
  },
  // 选项...
}