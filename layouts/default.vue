<template>
  <el-container direction="vertical" class="l-default">
    <Header />
    <div class="container">
      <Nuxt />
    </div>
    <Footer />
  </el-container>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss" scoped>
.l-default {
  background-color: var(--background);
  .el-main {
    position: relative;
    top: 76px;
    left: 257px;
    max-width: calc(100% - 257px);
    min-height: calc(100vh - 76px);
    padding: 32px 36px;
    background-color: var(--background);
  }
}
</style>
