import axios from 'axios'
import { env, host, timeout } from 'env'

class Http {
  constructor (ctx) {
    this.instance = axios.create({
      baseURL: (env === 'development' ? host[env] : 'http://localhost/'),
      headers: {
        Accept: 'application/x.api.latest+json',
        Authorization: `Bearer ${this.getAuthToken(ctx)}`
      },
      timeout: timeout.server
    })
  }

  async get (url, data) {
    try {
      const res = await this.instance.get(url, {
        params: data && data.params ? data.params : {}
      })
      return res.data.data
    } catch (e) {
      const code = e.response ? e.response.status : 500
      if (code === 401) {
        return null
      }
      e.code = code
      throw e
    }
  }

  async post (url, data) {
    try {
      const res = await this.instance.post(url, data)
      const newToken = res.headers.authorization
      if (newToken) {
        return Object.assign(res.data.data, {
          token: newToken.split('Bearer ').pop()
        })
      }
      return res.data.data
    } catch (e) {
      const code = e.response ? e.response.status : 500
      if (code === 401) {
        return null
      }
      e.code = code
      throw e
    }
  }

  getAuthToken (ctx) {
    if (!ctx) {
      return ''
    }
    let token = ''
    if (ctx.header) {
      const cookie = ctx.header.cookie
      if (cookie) {
        cookie.split('; ').forEach(item => {
          const temp = item.split('=')
          if (temp[0] === 'JWT-TOKEN') {
            token = temp[1]
          }
        })
      }
    } else if (ctx.$state) {
      // TODO
    } else {
      token = ctx
    }
    return token
  }
}

export default (ctx) => {
  return new Http(ctx)
}
