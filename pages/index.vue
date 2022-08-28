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
      >
      </el-input>
      <div class="p-home-page__article-card">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',

  async asyncData({ $api }) {
    const params = {
      limit: 40,
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
    }
  },

  methods: {
    getParams() {
      const params = {
        page: this.page,
        limit: this.limit,
      }

      if (this.title) params.title = this.title

      return params
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
