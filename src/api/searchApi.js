import BaseApi from './_baseApi'

export default class extends BaseApi {
  index (q) {
    return this.http.get('search/index', {
      params: q
    })
  }
}
