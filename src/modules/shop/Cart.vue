<template>
  <div class="cart">
    <div class="cart-info" @click="handleCartClick">
      <i v-show="count > 0">{{ count }}</i>
      <img src="">
      <div class="price-info">
        <span>{{ `￥${price}` }}</span>
      </div>
    </div>
    <div class="cart-bill">
      <button>去结算</button>
    </div>
    <div class="cart-detail" v-show="showDetail">
      <ul>
        <li v-for="item in foodInCart">
          <span>{{ item.label }}</span>
          <span>{{ `￥${item.price}` }}</span>
          <counter :count="item.count" @increase="handleCountChange($event, 'increase')" @decrease="handleCountChange($event, 'decrease')"></counter>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cart',
    props: {
      food: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        count: 0,
        price: 0,
        showDetail: false,
        foodInCart: this.food,
      }
    },
    methods: {
      handleCartClick() {
        this.showDetail = !this.showDetail
      },
      handleCountChange(count, $event) {
        
      },
    },
    mounted() {
      this.$on('increase', (params) => {
        this.count++
        this.price += params.price
        if (!this.foodInCart.some((element) => { return element.name === params.name })) {
          this.foodInCart.push(params)
        }
      })
      this.$on('decrease', (params) => {
        this.count--
        this.price -= params.price
      })
    },
  }
</script>

<style lang="scss" scoped>
  .cart {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 1rem;
    background-color: white;
    border-top: .01rem solid black;
    display: flex;
    .cart-info {
      flex: 3;
      display: flex;
      img {
        width: 1rem;
        height: 1rem;
      }
      i {
        position: absolute;
        top: -.15rem;
        left: .85rem;
        width: .2rem;
        height: .2rem;
        border: .01rem solid red;
        border-radius: 100%;
        display: block;
        color: white;
        background-color: red;
        font-style: normal;
        line-height: .2rem;
        text-align: center;
        font-size: 12px;
      }
      .price-info {
        flex: 1;
      }
    }
    .cart-bill {
      flex: 1;
      button {
        width: 100%;
        height: 100%;

      }
    }
    .cart-detail {
      position: fixed;
      bottom: 0;
      margin-bottom: 1rem;
      width: 100%;
      height: 5rem;
      background-color: white;
    }
  }
</style>