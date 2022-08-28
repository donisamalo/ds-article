<template>
  <el-header height="auto" :class="['c-header', { '-small': isSmallHeader }]">
    <el-image :src="logo" @click="$router.push('/')"></el-image>
  </el-header>
</template>

<script>
import logo from '@/assets/image/logo.png'
export default {
  name: 'LayoutHeader',
  data() {
    return {
      logo,
      isSmallHeader: false,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (window.scrollY === 0) this.isSmallHeader = false
      else if (window.scrollY > 120) this.isSmallHeader = true
    },
  },
}
</script>

<style lang="scss" scoped>
.c-header {
  position: sticky;
  top: 0;
  text-align: center;
  padding: 16px 0;
  box-shadow: 0 5px 8px -2px rgb(160 219 255 / 50%);
  background: var(--white);
  transition: all 0.5s ease;
  z-index: 99;

  &.-small {
    padding: 4px 0;
    :deep(.el-image) {
      img {
        width: 160px;
      }
    }
  }

  :deep(.el-image) {
    img {
      width: 240px;
      transition: all 0.5s ease;
      cursor: pointer;
    }
  }
}
</style>
