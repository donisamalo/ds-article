const baseUrl =
  process.env.API_BASE_URL || 'https://62d5368fd4406e5235558a46.mockapi.io'
const url = `${baseUrl}/banners`

export default (axios) => ({
  getAll() {
    return axios.get(url)
  },
})
