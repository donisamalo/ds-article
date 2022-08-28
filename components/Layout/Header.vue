<template>
  <el-header height="auto" class="c-header">
    <el-image :src="logo"></el-image>
  </el-header>
</template>

<script>
import logo from '@/assets/image/logo.png'
export default {
  name: 'LayoutHeader',
  data() {
    return {
      logo,
    }
  },
}
</script>

<style lang="scss" scoped>
.c-header {
  text-align: center;
  padding: 16px 0;
  border: 1px solid var(--border);
  background: var(--white);
  :deep(.el-image) {
    img {
      width: 240px;
      @include mq-small {
        display: none;
      }
    }
  }
}
</style>
