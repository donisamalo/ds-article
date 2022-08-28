<template>
  <div class="c-comment-section">
    <h4>{{ comments.length }} Comments</h4>

    <div
      v-for="comment in comments"
      :key="comment.id"
      class="c-comment-section__list"
    >
      <el-row type="flex" justify="space-between">
        <el-row type="flex" align="bottom">
          <h5>{{ comment.user || 'Anonymous' }}</h5>
          <span>{{ $dayjs(comment.createdAt).fromNow() }}</span>
        </el-row>

        <el-row type="flex" align="middle">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="showModal(comment)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="deleteComment(comment.id)"
          ></el-button>
        </el-row>
      </el-row>

      <p>{{ comment.comment }}</p>
    </div>

    <el-dialog title="Edit Comment" :visible.sync="config.isShowModal">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Leave your thoughts here..."
        v-model="comment"
      >
      </el-input>
      <el-input
        v-show="!config.isAnonymously"
        placeholder="Please input your name"
        v-model="user"
      ></el-input>
      <el-switch v-model="config.isAnonymously" active-text="Send anonymously">
      </el-switch>

      <div slot="footer" class="dialog-footer">
        <el-button @click="config.isShowModal = false">Cancel</el-button>
        <el-button
          type="primary"
          :loading="isLoading"
          :disabled="isButtonDisabled"
          @click="updateComment"
        >
          Edit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommnentSection',
  props: {
    comments: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isButtonDisabled() {
      return (
        !this.comment.length ||
        (!this.config.isAnonymously && !this.user.length)
      )
    },
  },
  data() {
    return {
      commentId: null,
      comment: '',
      user: '',
      config: {
        isShowModal: false,
        isAnonymously: true,
      },
    }
  },
  methods: {
    showModal(selected) {
      const { id, comment, user } = selected
      this.commentId = id
      this.comment = comment

      this.user = user
      this.config.isAnonymously = !this.user

      this.config.isShowModal = true
    },
    updateComment() {
      const params = {
        commentId: this.commentId,
        payload: {
          user: this.config.isAnonymously ? '' : this.user,
          comment: this.comment,
        },
      }
      this.$emit('update:comment', params)
    },
    deleteComment(id) {
      this.$confirm('This will permanently delete. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        callback: (action) => {
          if (action === 'confirm') {
            this.$emit('delete:comment', id)
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.c-comment-section {
  &__list {
    padding: 12px;
    border-bottom: 1px solid var(--border);
    &:nth-last-child(2) {
      border-bottom: 0;
    }

    .el-row {
      h5 {
        font-size: 14px;
        margin: 0;
      }

      span {
        font-size: 12px;
        margin-left: 8px;
        color: var(--gray);
      }

      p {
        margin-bottom: 0;
      }
    }
  }
  :deep(.el-dialog) {
    .el-input {
      margin-top: 12px;
    }

    .el-switch {
      margin-top: 12px;
    }
  }
}
</style>
