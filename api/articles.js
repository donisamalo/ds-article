const baseUrl =
  process.env.API_BASE_URL || 'https://62d5368fd4406e5235558a46.mockapi.io'
const url = `${baseUrl}/articles`

export default (axios) => ({
  getAll(params) {
    return axios.get(url, { params })
  },
  getDetail(id) {
    return axios.get(`${url}/${id}`)
  },
  getComment(articleId) {
    return axios.get(`${url}/${articleId}/comments`)
  },
  postComment({ articleId, payload }) {
    return axios.post(`${url}/${articleId}/comments`, payload)
  },
  updateComment({ articleId, commentId, payload }) {
    return axios.put(`${url}/${articleId}/comments/${commentId}`, payload)
  },
  deleteComment({ articleId, commentId }) {
    return axios.delete(`${url}/${articleId}/comments/${commentId}`)
  },
})
