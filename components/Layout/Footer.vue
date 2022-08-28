<template>
  <el-footer height="auto" class="c-footer">
    Copyright &copy; 2022 DS'Article
  </el-footer>
</template>

<script>
import Logo from '@/assets/image/logo.png'
export default {
  name: 'LayoutFooter',
  data() {
    return {
      Logo,
    }
  },
}
</script>

<style lang="scss" scoped>
.c-footer {
  padding: 16px;
  text-align: center;
  color: var(--white);
  background-color: var(--black);
}
</style>
