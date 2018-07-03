const dev = process.env.NODE_ENV === 'development'

const host = {
  development: 'http://localhost:3099/',
  staging: 'https://t-api.calibur.tv/',
  production: 'https://api.calibur.tv/'
}

const cdn = {
  image: 'https://image.calibur.tv/',
  video: 'https://video.calibur.tv/'
}

const qiniu = {
  host: 'https://static.calibur.tv/',
  access: '',
  secret: '',
  bucket: '',
  prefix: ''
}

const timeout = {
  server: 10000,
  client: 30000
}

const script = {
  baiduStat: dev ? '' : ``,
  baiduPush: dev ? '' : ``
}

const env = process.env.NODE_ENV

const listCacheLimit = 5
const listFetchCount = 15
const sentry = {
  token: '',
  url: ''
}

module.exports = {
  host,
  timeout,
  env,
  script,
  listCacheLimit,
  listFetchCount,
  cdn,
  qiniu,
  sentry
}
