<template>
  <div shadow="hover" class="c-article-card">
    <el-image :src="article.image" fit="cover"></el-image>
    <div class="c-article-card__content">
      <h5>{{ article.title }}</h5>
      <p>{{ article.previewContent }}</p>
      <!-- <p>
        Modi nam distinctio excepturi itaque. Tempora est asperiores illo beatae
        adipisci ducimus ut. Et vitae eveniet quam eius. Excepturi sed odit
        rerum ea et aut quia. Aut iste similique. Occaecati vero quaerat.\nEt
        quia praesentium voluptatem consequatur explicabo tempore. Rerum
        consequatur suscipit omnis quis vel. Ea nam eveniet. Et nesciunt
        voluptatibus blanditiis.\nOmnis dolore voluptas nemo quos porro
        explicabo eligendi. Cupiditate reiciendis similique est omnis id
        asperiores iure. Enim fuga quod laudantium. Facere vitae eaque in
        cupiditate. Voluptates animi sed laborum.
      </p>
      <el-row type="flex" justify="space-between">
        <span>by: Emma Kessler</span>
        <span>{{ $dayjs().format('DD MMM YYYY') }}</span>
      </el-row> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.c-article-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 12px 6px rgb(0 0 0 / 10%);
  }

  :deep(.el-image) {
    width: 100%;
    height: 275px;
    border-radius: 12px 12px 0 0;
  }

  &__content {
    border-radius: 0 0 12px 12px;
    padding: 16px;
    background: var(--white);

    h5 {
      font-size: 22px;
      font-weight: bold;
      margin: 0;
    }

    p {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-align: center;
      height: 38px;
      margin-bottom: 0;
    }
  }
}
</style>
