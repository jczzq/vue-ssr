const dev = process.env.NODE_ENV === 'development'

const host = {
  development: 'https://cl-gateway.tuhutest.cn/cl-tire-site',
  staging: 'https://cl-gateway.tuhutest.cn/cl-tire-site',
  production: 'https://cl-gateway.tuhu.cn/cl-tire-site'
}

const timeout = {
  server: 10000,
  client: 30000
}

const env = process.env.NODE_ENV

const sentry = {
  token: '',
  url: ''
}

module.exports = {
  host,
  timeout,
  env
}