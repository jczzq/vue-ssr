import BaseApi from './_baseApi'

export default class extends BaseApi {
  getBanners () {
    return this.http.get('image/banner')
  }

  getCaptcha () {
    return this.http.get('image/captcha')
  }

  getUpToken () {
    return this.http.get('image/uptoken')
  }

  uploadToQiniu (formData) {
    return this.http.post('https://up.qbox.me', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  getUploadType () {
    return this.http.get('image/uploadType')
  }

  uploadImage ({ images, bangumiId, roleId, tags, size, creator, albumId }) {
    return this.http.post('image/upload', { images, bangumiId, roleId, tags, size, creator, albumId })
  }

  deleteImage ({ id }) {
    return this.http.post('image/delete', { id })
  }

  trialReport ({ id }) {
    return this.http.post('image/report', { id })
  }

  editImage ({ id, bangumiId, roleId, size, tags }) {
    return this.http.post('image/edit', { id, bangumiId, roleId, tags, size })
  }

  toggleLike ({ id }) {
    return this.http.post('image/toggleLike', { id })
  }

  trendingList ({ seenIds, take, sort, size, tags, bangumiId, creator }) {
    return this.http.get('image/trendingList', {
      params: { seenIds, take, sort, size, tags, bangumiId, creator }
    })
  }

  createAlbum ({ bangumiId, isCartoon, name, url, width, height, creator }) {
    return this.http.post('image/createAlbum', { bangumiId, isCartoon, name, url, width, height, creator })
  }

  editAlbum (params) {
    return this.http.post('image/editAlbum', params)
  }

  getAlbumData ({ id }) {
    return this.http.get(`image/album/${id}/show`)
  }

  sortAlbum ({ id, result }) {
    return this.http.post(`image/album/${id}/sort`, { result })
  }

  deleteAlbumImage ({ id, result, imageId }) {
    return this.http.post(`image/album/${id}/deleteImage`, { result, imageId })
  }
}
