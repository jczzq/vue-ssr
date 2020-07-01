const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const resolve = file => path.resolve(__dirname, file);
const isDev = process.env.NODE_ENV === 'development';

const config = merge(base, {
    entry: {
        app: resolve('../src/entry/entry-client.js'),
        vendor: ['vue', 'vuex', 'vue-router', 'vue-meta', 'axios', 'lodash']
    },
    resolve: {
        alias: {
            'create-api': resolve('../src/api/_create-api-client.js'),
            log: resolve('../src/log/client.js')
        }
    },
    plugins: (function() {
        let pluginArr = [
            // strip dev-only code in Vue source
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.VUE_ENV': '"client"'
            }),
            // extract vendor chunks for better caching
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function(module) {
                    // a module is extracted into the vendor chunk if...
                    return (
                        // it's inside node_modules
                        /node_modules/.test(module.context) &&
                        // and not a CSS file (due to extract-text-webpack-plugin limitation)
                        !/\.css$/.test(module.request)
                    );
                }
            }),
            // extract webpack runtime & manifest to avoid vendor chunk hash changing
            // on every build.
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest'
            }),
            new VueSSRClientPlugin()
        ];

        // 线上环境
        if (!isDev) {
            // 将 bundle 拆分成更小的 chunk，直到各个 chunk 的大小达到 option 设置的 maxSize
            pluginArr = pluginArr.concat([new webpack.optimize.AggressiveSplittingPlugin()]);
        }

        return pluginArr;
    })()
});

module.exports = config;
