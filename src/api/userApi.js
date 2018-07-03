import BaseApi from './_baseApi'

export default class extends BaseApi {
  getLoginUser () {
    return this.http.post('door/user')
  }

  sendMessage ({ phone_number, type, geetest }) {
    return this.http.post('door/message', {
      phone_number, type, geetest
    })
  }

  login ({ access, secret, remember, geetest }) {
    return this.http.post('door/login', {
      access, secret, remember, geetest
    })
  }

  register ({ access, secret, nickname, authCode, inviteCode }) {
    return this.http.post('door/register', {
      access, secret, nickname, authCode, inviteCode
    })
  }

  logout () {
    return this.http.post('door/logout')
  }

  getUserInfo ({ zone }) {
    return this.http.get(`user/${zone}/show`)
  }

  settingProfile (params) {
    return this.http.post('user/setting/profile', params)
  }

  followBangumis (zone) {
    return this.http.get(`user/${zone}/followed/bangumi`)
  }

  followPosts ({ type, zone, take, minId }) {
    return this.http.get(`user/${zone}/posts/${type}`, {
      params: { take, minId }
    })
  }

  settingImage ({ type, url }) {
    return this.http.post('user/setting/image', { type, url })
  }

  feedback ({ type, desc, ua }) {
    return this.http.post('user/feedback', { type, desc, ua })
  }

  daySign () {
    return this.http.post('user/daySign')
  }

  getNotificationCount () {
    return this.http.get('user/notification/count')
  }

  getNotifications ({ minId }) {
    return this.http.get('user/notification/list', {
      params: { minId }
    })
  }

  readMessage (id) {
    return this.http.post('user/notification/read', { id })
  }

  readAllMessage () {
    return this.http.post('user/notification/clear')
  }

  resetPassword ({ method, access, authCode, secret }) {
    return this.http.post('door/reset', {
      method, access, authCode, secret
    })
  }

  images ({ zone, take, seenIds, size, tags, bangumiId, creator }) {
    return this.http.get(`user/${zone}/images/list`, {
      params: { take, seenIds, size, tags, bangumiId, creator }
    })
  }

  getUserAlbums () {
    return this.http.get('user/images/albums')
  }

  followRoles ({ zone, page }) {
    return this.http.get(`user/${zone}/followed/role`, {
      params: { page }
    })
  }
}
