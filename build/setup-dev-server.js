const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

module.exports = (app, templatePath, callback) => {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(resolve => { ready = resolve })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      callback(bundle, {
        template,
        clientManifest
      })
    }
  }
  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client?reload=true', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: '200.template.html',
      template: templatePath,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  )

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('./koa2/dev.js')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true
    }
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    if (stats.errors.length) {
      stats.errors.forEach(error => {
        console.log(error);
      })
      return
    }
    const mfs = devMiddleware.fileSystem
    const filePath = path.join(clientConfig.output.path, '200.template.html')
    if (mfs.existsSync(filePath)) {
      template = mfs.readFileSync(filePath, 'utf-8')
      clientManifest = JSON.parse(readFile(mfs, 'vue-ssr-client-manifest.json'))
      update()
    }
  })

  // hot middleware
  app.use(require('./koa2/hot.js')(clientCompiler, { heartbeat: 5000 }))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) {
      stats.errors.forEach(error => {
        console.log(error);
      })
      return
    }

    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    update()
  })

  return readyPromise
}
