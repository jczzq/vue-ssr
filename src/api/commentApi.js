import BaseApi from './_baseApi'

export default class extends BaseApi {
  getMainCommentList ({ type, id, fetchId, onlySeeMaster, seeReplyId }) {
    return this.http.get(`${type}/comment/${id}/main/list`, {
      params: { fetchId, onlySeeMaster, seeReplyId }
    })
  }

  getSubCommentList ({ type, parentId, maxId }) {
    return this.http.get(`${type}/comment/${parentId}/sub/list`, {
      params: { maxId }
    })
  }

  createMainComment ({ type, id, content, images }) {
    return this.http.post(`${type}/comment/${id}/create`, { content, images })
  }

  createSubComment ({ type, id, content, targetUserId }) {
    return this.http.post(`${type}/comment/${id}/reply`, { content, targetUserId })
  }

  deleteSubComment ({ type, id }) {
    return this.http.post(`${type}/comment/delete/sub/${id}`)
  }

  deleteMainComment ({ type, id }) {
    return this.http.post(`${type}/comment/delete/main/${id}`)
  }

  toggleLikeMainComment ({ type, id }) {
    return this.http.post(`${type}/comment/main/toggleLike/${id}`)
  }

  toggleLikeSubComment ({ type, id }) {
    return this.http.post(`${type}/comment/sub/toggleLike/${id}`)
  }
}
