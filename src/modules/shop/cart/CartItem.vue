<template>
  <li>
    <span>{{ item.label }}</span>
    <span>{{ `￥${item.price}` }}</span>
    <counter :count="item.count"
      @increase="handleCountChange($event, 'increase')"
      @decrease="handleCountChange($event, 'decrease')"></counter>
  </li>
</template>

<script>
import Emitter from '@/mixins/emitter'

export default {
  name: 'CartItem',
  mixins: [Emitter],
  props: {
    item: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    handleCountChange (count, event) {
      this.dispatch('Shop', event, Object.assign({}, this.item, {
        from: 'cart',
      }))
      if (count < 1) {
        this.dispatch('Cart', 'deleteitem', Object.assign({}, this.item, {
        from: 'cart',
      }))
      }
    },
  },
}
</script>
