<template>
  <div>
    <top
    :showBack="true"></top>
    <shop-header></shop-header>
    <tab value="category">
      <tab-pane name="category" label="商品">
        <side-nav :nav="sideNav"></side-nav>
      </tab-pane>
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
    components: { ShopHeader },
    props: {},
    data() {
      return {
        sideNav: [{
          label: '热销',
          name: 'hot',
        }, {
          label: '优惠',
          name: 'discount',
        }, {
          label: '套餐',
          name: 'meal',
        }, {
          label: '面食',
          name: 'noodles',
        }, {
          label: '汤类',
          name: 'soup',
        }, {
          label: '小吃',
          name: 'snack',
        }, {
          label: '饮料',
          name: 'drink',
        }, {
          label: '支持',
          name: 'support',
        }, {
          label: '鸡汤',
          name: 'bullshit',
        }, {
          label: '农药',
          name: 'tencent',
        }, {
          label: '猪肉',
          name: 'netease',
        }],
      }
    },
    methods: {

    },
  }
</script>