const NODE_ENV = process.env.NODE_ENV;
console.log('--------- process.env.NODE_ENV: ', NODE_ENV);
const PORT = process.env.PORT || 3000;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const HOST = IS_PROD ? '0.0.0.0' : '127.0.0.1';

const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const Koa = require('koa');
const LRU = require('lru-cache');
const Route = require('koa-router');

const app = new Koa();
const router = new Route();

// 最大缓存数量100，每15分钟刷新缓存
const microCache = LRU({
  max: 100,
  maxAge: IS_DEV ? 0 : 1000 * 60 * 15
});
const cacheHTML = status => {
  const code = [200, 404, 429, 500, 503].indexOf(status) !== -1 ? status : 500;
  const hit = microCache.get(`render-html-${code}`);
  let html;
  if (hit && !IS_DEV) {
    html = hit;
  } else {
    html = fs.readFileSync(resolve(`./src/templates/${code}.template.html`), 'utf-8');
    microCache.set(`render-html-${code}`, html);
  }
  return html;
};

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const templatePath = resolve('./src/templates/200.template.html');
const template = cacheHTML(200);

let renderer;

if (IS_DEV) {
  app.use(require('koa-logger')());
  require('./build/setup-dev-server')(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
} else {
  app.use(
    require('koa-static')('./dist', {
      maxage: 2592000
    })
  );

  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');

  renderer = createRenderer(bundle, { template, clientManifest });
}

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      template,
      cache: microCache,
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  );
}

router.get('*', async ctx => {
  let req = ctx.req;
  ctx.status = 200;
  ctx.type = 'html';

  if (!renderer) {
    ctx.status = 503;
    ctx.body = cacheHTML(503);
    return;
  }

  let context = {
    url: req.url,
    ctx: ctx.request
  };

  ctx.set('X-XSS-Protection', '1; mode=block');
  // HTTP/1.1 分块传输编码
  ctx.set('Transfer-Encoding', 'chunked');
  ctx.set('X-Content-Type-Options', 'nosniff');
  ctx.set('X-Frame-Options', 'DENY');
  ctx.set('Cache-Control', 'max-age=0, private');

  try {
    ctx.body = await renderer.renderToString(context);
  } catch (e) {
    const code = e.code || 500;
    ctx.status = code;
    console.error('renderToString error: ', e);
    ctx.body = cacheHTML(code);
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, HOST);
console.log('Server listening on http://' + HOST + ':' + PORT);
