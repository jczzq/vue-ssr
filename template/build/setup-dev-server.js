const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    } catch (e) {}
};

/**
 * 返回一个promise
 * @param {*} app new Koa()实例
 * @param {*} templatePath 模板页面的路径
 * @param {*} callback 
 */
module.exports = (app, templatePath, callback) => {
    let bundle;
    let template;
    let clientManifest;

    let ready;
    const readyPromise = new Promise(resolve => {
        ready = resolve;
    });
    const update = () => {
        if (bundle && clientManifest) {
            ready();
            callback(bundle, {
                template,
                clientManifest
            });
        }
    };
    // 修改客户端webpack配置，启用热重载
    clientConfig.entry.app = ['webpack-hot-middleware/client?reload=true', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        // HMR 热替换
        new webpack.HotModuleReplacementPlugin(),
        // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack.NoEmitOnErrorsPlugin(),
        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.NamedModulesPlugin(),
        // （根据模板）生成HTML文件
        new HtmlWebpackPlugin({
            filename: '200.template.html',
            template: templatePath,
            minify: {
                // 移除节点之间的空格
                collapseWhitespace: true,
                // 移除节点属性的引号
                removeAttributeQuotes: true
            }
        })
    );

    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require('./koa2/dev.js')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        // 控制编译的时候shell上的输出内容 eg: stats: { colors: true } 更多配置：http://www.css88.com/doc/webpack2/configuration/stats
        stats: 'minimal'
    });
    app.use(devMiddleware);
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson();
        if (stats.errors.length) {
            stats.errors.forEach(error => {
                console.log(error);
            });
            return;
        }
        const mfs = devMiddleware.fileSystem;
        const filePath = path.join(clientConfig.output.path, '200.template.html');
        if (mfs.existsSync(filePath)) {
            template = mfs.readFileSync(filePath, 'utf-8');
            clientManifest = JSON.parse(readFile(mfs, 'vue-ssr-client-manifest.json'));
            update();
        }
    });

    // 热重载
    app.use(require('./koa2/hot.js')(clientCompiler, { heartbeat: 5000 }));

    // 监视并更新 server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) {
            stats.errors.forEach(error => {
                console.log(error);
            });
            return;
        }

        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
        bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
        update();
    });

    return readyPromise;
};
