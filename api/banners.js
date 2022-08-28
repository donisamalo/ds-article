const baseUrl = process.env.API_BASE_URL
const url = `${baseUrl}/banners`

export default (axios) => ({
  getBanners() {
    return axios.get(url)
  },
})
