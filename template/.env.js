const dev = process.env.NODE_ENV === 'development'

const host = {
  development: 'https://cnodejs.org',
  staging: 'https://cnodejs.org',
  production: 'https://cnodejs.org'
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