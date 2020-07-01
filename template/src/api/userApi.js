import BaseApi from './_baseApi';

export default class extends BaseApi {
  getUserInfo({ zone }) {
    return this.http.get(`user/${zone}/show`);
  }
}
