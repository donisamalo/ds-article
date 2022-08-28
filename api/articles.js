const baseUrl = process.env.API_BASE_URL
const url = `${baseUrl}/articles`

export default (axios) => ({
  getAll(params) {
    return axios.get(url, { params })
  },
  getDetail(id) {
    return axios.get(`${url}/${id}`)
  },
  getComments(articleId) {
    return axios.get(`${url}/${articleId}/comments`)
  },
  postComment({ articleId, payload }) {
    return axios.get(`${url}/${articleId}/comments`, payload)
  },
  updateComment({ articleId, commentId, payload }) {
    return axios.put(`${url}/${articleId}/comment/${commentId}`, payload)
  },
  deleteComment({ articleId, commentId }) {
    return axios.delete(`${url}/${articleId}/comment/${commentId}`)
  },
})
