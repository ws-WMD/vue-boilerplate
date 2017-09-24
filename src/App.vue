<template>
  <div class="layout">
    <router-view transition transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px'
    }
  }
</script>

<style lang="scss">
  @import './style/index';
</style>