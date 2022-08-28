<template>
  <div class="p-article-page">
    <h2>{{ article.title }}</h2>
    <el-image :src="article.image" fit="contain"></el-image>
    <p>
      {{ article.content }}
    </p>
    <el-row type="flex" justify="space-between">
      <span>by: {{ article.createBy }}</span>
      <span>{{ $dayjs(article.createdAt).format('DD MMM YYYY') }}</span>
    </el-row>

    <el-divider></el-divider>

    <h3>Comments</h3>
    <CommentInput
      ref="commentInput"
      :is-loading="config.isLoadingInput"
      @post:comment="postComment"
    />
    <CommentSection
      ref="commentSection"
      :comments="comments"
      :is-loading="config.isLoadingSection"
      @update:comment="updateComment"
      @delete:comment="deleteComment"
    />
  </div>
</template>

<script>
import errorMixin from '@/mixins/error'

export default {
  name: 'ArticlePage',
  mixins: [errorMixin],

  async asyncData({ $api, params, redirect }) {
    try {
      const { id } = params
      const article = await $api.articles.getDetail(id)
      const comments = await $api.articles.getComment(id)
      return {
        article: article.data,
        comments: comments.data,
      }
    } catch (error) {
      redirect('/error')
    }
  },

  data() {
    return {
      article: [],
      comments: [],
      config: {
        isLoadingInput: false,
        isLoadingSection: false,
      },
    }
  },

  computed: {
    articleId() {
      const { id } = this.$route.params
      return id
    },
  },

  methods: {
    async getComment() {
      try {
        const { data } = await this.$api.articles.getComment(this.articleId)
        this.comments = data
      } catch (error) {
        this.errorHandler(error)
      }
    },

    async postComment(payload) {
      try {
        this.config.isLoadingInput = true
        await this.$api.articles.postComment({
          articleId: this.articleId,
          payload,
        })
        this.$message({
          message: 'Comment Posted Successfully',
          type: 'success',
          duration: 5000,
        })
        this.$refs.commentInput.resetField()
        this.getComment()
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.config.isLoadingInput = false
      }
    },

    async updateComment(params) {
      try {
        this.config.isLoadingSection = true
        await this.$api.articles.updateComment({
          articleId: this.articleId,
          ...params,
        })
        this.$message({
          message: 'Edit Comment Successfully!',
          type: 'success',
          duration: 5000,
        })
        this.$refs.commentSection.config.isShowModal = false
        this.getComment()
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.config.isLoadingSection = false
      }
    },

    async deleteComment(commentId) {
      try {
        await this.$api.articles.deleteComment({
          articleId: this.articleId,
          commentId,
        })
        this.$message({
          message: 'Delete Comment Successfully!',
          type: 'success',
          duration: 5000,
        })
        this.getComment()
      } catch (error) {
        this.errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
