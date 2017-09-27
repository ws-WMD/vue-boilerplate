<template>
  <div class="shop">
    <div class="shop-info">
      <top
      :showBack="true"></top>
      <shop-header></shop-header>
    </div>
    <tab value="category" class="shop-food">
      <tab-pane name="category" label="商品">
        <side-nav :nav="sideNav" value="hot">
          <template slot="content">
            <food-list v-for="item in food"
            :name="item.name"
            :label="item.label"
            :description="item.description"
            :food="item.food"></food-list>
          </template>
        </side-nav>
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

  import Emitter from '@/mixins/emitter'

  export default {
    name: 'Shop',
    components: { ShopHeader, FoodList, Cart },
    mixins: [ Emitter ],
    props: {},
    data() {
      return {
        sideNav: [],
        food: [],
      }
    },
    methods: {
      handleIncrease(params) {
        this.broadcast('SideNav', 'increase', params)
        this.broadcast('Cart', 'increase', params)
      },
      handleDecrease(params) {
        this.broadcast('SideNav', 'decrease', params)
        this.broadcast('Cart', 'decrease', params)
      },
    },
    created() {
      fetch('./src/mock/sideNav.json')
      .then((response) => {
        response.json().then((data) => {
          this.sideNav = data.data
        })
      })
      fetch('./src/mock/food.json')
      .then((response) => {
        response.json().then((data) => {
          this.food = data.data
        })
      })
    },
    mounted() {
      this.$on('increase', this.handleIncrease)
      this.$on('decrease', this.handleDecrease)
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