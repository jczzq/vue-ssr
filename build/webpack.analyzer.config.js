const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = file => path.resolve(__dirname, file)

const config = merge(base, {
  entry: {
    app: resolve('../src/entry/entry-client.js')
  },
  resolve: {
    alias: {
      'create-api': resolve('../src/api/_create-api-client.js')
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 9999
    })
  ]
})

module.exports = config
