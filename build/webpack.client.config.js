const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const QiniuPlugin = require('qiniu-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const qiniu = require('../.env').qiniu

const config = merge(base, {
  entry: {
    app: resolve('../src/entry/entry-client.js'),
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'vue-meta',
      'axios',
      'lodash'
    ]
  },
  resolve: {
    alias: {
      'create-api': resolve('../src/api/_create-api-client.js'),
      'log': resolve('../src/log/client.js')
    }
  },
  plugins: (function () {
    let pluginArr = [
      // strip dev-only code in Vue source
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      // extract vendor chunks for better caching
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // a module is extracted into the vendor chunk if...
          return (
            // it's inside node_modules
            /node_modules/.test(module.context) &&
            // and not a CSS file (due to extract-text-webpack-plugin limitation)
            !/\.css$/.test(module.request)
          )
        }
      }),
      // extract webpack runtime & manifest to avoid vendor chunk hash changing
      // on every build.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new VueSSRClientPlugin()
    ]

    if (!isDev) {
      pluginArr = pluginArr.concat([
        new webpack.optimize.AggressiveSplittingPlugin()
      ])
    }

    if (isProd) {
      pluginArr = pluginArr.concat([
        new QiniuPlugin({
          ACCESS_KEY: qiniu.access,
          SECRET_KEY: qiniu.secret,
          bucket: qiniu.bucket,
          path: qiniu.prefix
        })
      ])
    }

    return pluginArr
  }())
})

module.exports = config
