<template>
  <div class="shop">
    <div class="shop-info">
      <top
      :showBack="true"></top>
      <shop-header></shop-header>
    </div>
    <tab value="category" class="shop-food">
      <tab-pane name="category" label="商品">
        <side-nav :nav="sideNav" value="drink">
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
        food: [{
          label: '热销',
          name: 'hot',
          description: '烫烫烫烫烫烫烫烫烫烫烫烫',
          food: [{
            label: '白切鸡',
            name: 'chicken',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '烤鸭',
            name: 'roastduck',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }],
        }, {
          label: '优惠',
          name: 'discount',
          description: '锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷',
          food: [{
            label: '猪肉',
            name: 'pork',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef1',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef2',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef3',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef4',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef5',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef6',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef7',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef8',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef9',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }, {
            label: '牛肉',
            name: 'beef10',
            description: '不好次不好次不好次不好次',
            sales: '月售0份',
            price: 6,
          }],
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