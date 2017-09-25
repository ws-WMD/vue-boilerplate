<template>
  <div>
    <top
    :showBack="true"></top>
    <shop-header></shop-header>
    <tab value="category">
      <tab-pane name="category" label="商品"></tab-pane>
      <tab-pane name="comment" label="评价">
        <p>暂时没有评价</p>
      </tab-pane>
    </tab>
    
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