<template>
  <div class="c-comment-input">
    <el-input
      v-model="comment"
      type="textarea"
      :rows="4"
      placeholder="Leave your thoughts here..."
    >
    </el-input>
    <el-input
      v-show="!config.isAnonymously"
      v-model="user"
      placeholder="Please input your name"
    ></el-input>
    <el-switch v-model="config.isAnonymously" active-text="Send anonymously">
    </el-switch>
    <el-row type="flex" justify="end">
      <el-button
        type="primary"
        :loading="isLoading"
        :disabled="isButtonDisabled"
        @click="postComment"
      >
        Post
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CommnentInput',

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      comment: '',
      user: '',
      config: {
        isAnonymously: true,
      },
    }
  },

  computed: {
    isButtonDisabled() {
      return (
        !this.comment.length ||
        (!this.config.isAnonymously && !this.user.length)
      )
    },
  },

  methods: {
    postComment() {
      const { user, comment } = this
      const payload = {
        user: this.config.isAnonymously ? '' : user,
        comment,
      }
      this.$emit('post:comment', payload)
    },
    resetField() {
      this.user = ''
      this.comment = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.c-comment-input {
  .el-input {
    margin-top: 12px;
  }

  .el-switch {
    margin-top: 12px;
  }

  .el-row {
    margin-top: 20px;
  }
}
</style>
