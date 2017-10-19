<template>
  <div class="layout" >
    <!-- <router-link to='/home'> -->
    <!--   <span>to home</span> -->
    <!--   <svg class="arrow_right"> -->
    <!--     <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use> -->
    <!--   </svg> -->
    <!-- </router-link> -->
    <!-- <br> -->
    <!-- <router-link to='/msite'> -->
    <!--   <span>to msite</span> -->
    <!--   <svg class="arrow_right"> -->
    <!--     <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use> -->
    <!--   </svg> -->
    <!-- </router-link> -->
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
  	@import './style/common';
    @import './style/index';
</style>

