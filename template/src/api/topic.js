import BaseApi from './_baseApi';

export default class extends BaseApi {
  get(param) {
    return this.http.post(`/api/v1/topics`, param);
  }
}
