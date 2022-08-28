<template>
  <div class="p-home-page">
    <div class="p-home-page__banner">
      <el-carousel :interval="4000" type="card" arrow="always">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <el-image :src="banner.images" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-divider></el-divider>

    <div class="p-home-page__article">
      <h2>Article List</h2>

      <el-input
        v-model="title"
        placeholder="Search Articles"
        prefix-icon="el-icon-search"
        :suffix-icon="config.isLoading ? 'el-icon-loading' : null"
        @change="getArticles({ isResetPage: true })"
      >
      </el-input>

      <div v-if="articles.length" class="p-home-page__article-card">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
          @click.native="
            $router.push({
              name: 'article-id',
              params: { id: article.id },
            })
          "
        />
      </div>

      <p v-if="!articles.length && !config.isLoading" class="empty-state">
        Article not found
      </p>

      <SpinnerLoader v-if="config.isLoading" />

      <el-row v-else type="flex" justify="center">
        <el-button
          v-if="config.isShowViewMore"
          type="primary"
          @click="viewMore"
        >
          View More
        </el-button>
        <el-button
          v-if="articles.length > 10"
          @click="getArticles({ isViewLess: true })"
        >
          View Less
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import errorMixin from '@/mixins/error'

export default {
  name: 'HomePage',
  mixins: [errorMixin],

  async asyncData({ $api }) {
    const params = {
      page: 1,
      limit: 10,
    }
    const articles = await $api.articles.getAll(params)
    const banners = await $api.banners.getAll()
    return {
      articles: articles.data,
      banners: banners.data,
    }
  },

  data() {
    return {
      banners: [],
      articles: [],
      page: 1,
      limit: 10,
      title: '',
      config: {
        isLoading: false,
        isShowViewMore: true,
      },
    }
  },

  methods: {
    async getArticles({ isViewMore, isViewLess, isResetPage }) {
      try {
        if (isViewLess) {
          this.page = this.page - 1
          this.articles = this.articles.slice(0, -10)
          this.config.isShowViewMore = true
        } else {
          if (isResetPage) {
            this.page = 1
            this.config.isShowViewMore = true
          }
          this.config.isLoading = true

          const params = this.getParams()
          const { data } = await this.$api.articles.getAll(params)

          // Should be handled by using meta pagination object
          if (data.length < 10) this.config.isShowViewMore = false

          if (isViewMore) {
            this.articles.push(...data)
            if (!data.length) this.page = this.page - 1
          } else {
            this.articles = data
          }
        }
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.config.isLoading = false
      }
    },
    getParams() {
      const params = {
        page: this.page,
        limit: this.limit,
      }

      if (this.title) params.title = this.title

      return params
    },
    viewMore() {
      this.page = this.page + 1
      this.getArticles({ isViewMore: true })
    },
    searchArticles() {
      this.page = 1
      this.getArticles()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
