import Articles from '@/api/articles'
import Banners from '@/api/banners'

export default ({ $axios }, inject) => {
  $axios.onResponseError((error) => {
    console.error(error)
  })

  const factories = {
    articles: Articles($axios),
    banners: Banners($axios),
  }

  inject('api', factories)
}
