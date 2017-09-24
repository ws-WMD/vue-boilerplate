<template>
  <div>
    <top
    :showBack="true"></top>
    <shop-header></shop-header>
    <tab></tab>
    
  </div>
</template>

<script>
  import ShopHeader from './ShopHeader'


  export default {
    name: 'shop',
    components: { ShopHeader},
    props: {},
    data() {
      return {

      }
    },
    methods: {

    },
  }
</script>