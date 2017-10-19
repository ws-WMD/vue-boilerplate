<template>
  <div class="cart">
    <div class="cart-info"
      @click="handleCartClick">
      <i v-show="count > 0">{{ count }}</i>
      <img src="">
      <div class="price-info">
        <span>{{ `￥${price}` }}</span>
      </div>
    </div>
    <div class="cart-bill">
      <button v-text="billButtonText"
        :disabled="isBillDisabled"></button>
    </div>
    <div class="cart-detail"
      v-show="showDetail">
      <cart-list :foodInCart="foodInCart"></cart-list>
    </div>
  </div>
</template>

<script>
import CartList from './CartList'

export default {
  name: 'Cart',
  components: {
    CartList,
  },
  props: {
    food: {
      type: Array,
      default: () => [],
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      count: 0,
      price: 0,
      showDetail: false,
      foodInCart: this.food,
      isBillDisabled: true,
    }
  },
  methods: {
    handleCartClick () {
      this.showDetail = !this.showDetail
    },
    handleCountChange (count, $event) {

    },
  },
  computed: {
    billButtonText () {
      const diff = this.deliveryPrice - this.price
      return diff > 0 ? `还差￥${diff}起送` : '去结算'
    },
  },
  watch: {
    price (val) {
      this.isBillDisabled = !(val >= this.deliveryPrice)
    },
  },
  mounted () {
    this.$on('increase', (params) => {
      this.count++
      this.price += params.price
      let i = -1
      if (this.foodInCart.some((element, index) => {
        if (element.name === params.name) {
          i = index
          return true
        } else {
          return false
        }
      })) {
        this.foodInCart[i].count = params.count
      } else {
        this.foodInCart.push(params)
      }
    })
    this.$on('decrease', (params) => {
      this.count--
      this.price -= params.price
      let i = -1
      if (this.foodInCart.some((element, index) => {
        if (element.name === params.name) {
          i = index
          return true
        } else {
          return false
        }
      })) {
        if (i > -1) {
          if (params.count === 0) {
            this.foodInCart.splice(i, 1)
          } else {
            this.foodInCart[i].count = params.count
          }
        }
      }
    })
    this.$on('deleteitem', item => {
      let i = -1
      this.foodInCart.some((element, index) => {
        if (element.name === item.name) {
          i = index
          return true
        } else {
          return false
        }
      })
      if (i > -1) {
        this.foodInCart.splice(i, 1)
      }
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
      font-size: 12px;
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