import BaseApi from './_baseApi';

export default class extends BaseApi {
  get(param) {
    return this.http.get(`/api/v1/topics`, param);
  }
  getOne({ id, ...param }) {
    return this.http.get(`/api/v1/topic/${id}`, param);
  }
}
