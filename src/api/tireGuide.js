import BaseApi from './_baseApi';

export default class extends BaseApi {
  search(param) {
    return this.http.post(`/tireList/getGuideTireList`, param);
  }
}
