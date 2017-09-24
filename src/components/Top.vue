<template>
  <header>
    <span class="header-back-btn" v-if="showBack" @click="handleBackClick">&lt;</span>
    <slot name="left-tools"></slot>
    <span class="header-title" v-html="title"></span>
    <span class="header-more-btn" v-if="showMore">···</span>
  </header>
</template>

<script>
  export default {
    name: 'top',
    props: {
      showBack: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      showMore: {
        type: Boolean,
        default: false,
      },
      moreItems: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {

      }
    },
    methods: {
      handleBackClick() {
        window.history.back()
      },
    },
  }
</script>

<style lang="scss" scoped>
  header {
    background-color: #3190e8;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    .header-back-btn {
      float: left;
      margin-left: .1rem;
    }
    .header-more-btn {
      float: right;
      margin-right: .1rem;
    }
  }
</style>