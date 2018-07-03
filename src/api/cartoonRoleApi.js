import BaseApi from './_baseApi'

export default class extends BaseApi {
  trending ({ seenIds }) {
    return this.http.get('/trending/cartoon_role', {
      params: { seenIds }
    })
  }

  star ({ bangumiId, roleId }) {
    return this.http.post(`/bangumi/${bangumiId}/role/${roleId}/star`)
  }

  fans ({ bangumiId, roleId, seenIds, minId, sort }) {
    return this.http.get(`/bangumi/${bangumiId}/role/${roleId}/fans`, {
      params: { seenIds, minId, sort }
    })
  }

  show (id) {
    return this.http.get(`/cartoon_role/${id}/show`)
  }

  images ({ id, seenIds, take, size, tags, creator, sort }) {
    return this.http.get(`/cartoon_role/${id}/images`, {
      params: { seenIds, take, size, tags, creator, sort }
    })
  }
}
