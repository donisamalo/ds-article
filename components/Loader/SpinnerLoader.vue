<template>
  <div class="c-spinner-loader">
    <div v-for="(n, idx) in 4" :key="idx"></div>
  </div>
</template>

<style lang="scss" scoped>
.c-spinner-loader {
  display: block;
  margin: auto;
  position: relative;
  width: 55px;
  height: 55px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    margin: 8px;
    border: 5px solid var(--primary);
    border-radius: 50%;
    animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--primary) transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
