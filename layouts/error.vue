<template>
  <el-container direction="vertical" class="l-error">
    <h1>
      {{ error.statusCode === 404 ? pageNotFound : otherError }}
    </h1>
    <NuxtLink to="/" class="mt-20"> Home Page </NuxtLink>
  </el-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
.l-error {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
