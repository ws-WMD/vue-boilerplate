<template>
  <ul>
    <template v-for="(item, index) in foodInCart">
      <cart-item :key="index"
        :item="item"></cart-item>
    </template>
  </ul>
</template>

<script>
import CartItem from './CartItem'

export default {
  name: 'CartList',
  components: {
    CartItem,
  },
  props: {
    foodInCart: {
      type: Array,
      default: () => [],
    },
    data () {
      return {}
    },
    methods: {
      
    },
  },
}
</script>

