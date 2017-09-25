<template>
  <div class="shop">
    <div class="shop-info">
      <top
      :showBack="true"></top>
      <shop-header></shop-header>
    </div>
    <tab value="category" class="shop-food">
      <tab-pane name="category" label="商品">
        <side-nav :nav="sideNav" value="drink"></side-nav>
        <cart></cart>
      </tab-pane>
      <tab-pane name="comment" label="评价">
        <p>暂时没有评价</p>
      </tab-pane>
    </tab>
  </div>
</template>

<script>
  import ShopHeader from './ShopHeader'
  import FoodList from './foodList'
  import Cart from './Cart'

  export default {
    name: 'shop',
    components: { ShopHeader, FoodList, Cart },
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

<style lang="scss" scoped>
  .shop {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .shop-food {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .shop-food .pane {
    height: 100%;
    overflow-y: hidden;
    flex: 1;
  }
</style>