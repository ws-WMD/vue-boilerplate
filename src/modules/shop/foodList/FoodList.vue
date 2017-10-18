<template>
  <div class="food-list">
    <div class="list-header"
      :class="{ fixedTop: fixedTop }"
      :id="name">
      <span class="list-label">{{ label }}</span>
      <span class="list-description">{{ description }}</span>
    </div>
    <food-item v-for="(item, index) in food"
      :key="index"
      :name="item.name"
      :label="item.label"
      :description="item.description"
      :sales="item.sales"
      :price="item.price"></food-item>
  </div>
</template>

<script>
import FoodItem from './FoodItem'
import Emitter from '@/mixins/emitter'

export default {
  name: 'FoodList',
  components: { FoodItem },
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: '',
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      default: '',
    },
    food: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      fixedTop: false,
    }
  },
  computed: {
    header () {
      return this.$el.querySelector(`#${this.name}`)
    },
    headerOffsetTop () {
      return this.header.offsetTop
    },
    headerHeight () {
      return this.header.offsetHeight
    },
    listOffsetTop () {
      return this.$el.offsetTop
    },
  },
  methods: {
    handleScroll (parentScrollTop) {
      // this.fixedTop = parentScrollTop > this.headerOffsetTop - this.headerHeight;
      if (parentScrollTop >= this.listOffsetTop) {
        this.$parent.$emit('scrolled', this.name)
      }
    },
  },
  mounted () {
    this.$parent.$on('content-scroll', this.handleScroll)
    this.$on('increase', (params) => {
      if (params.listName === this.name) {
        this.broadcast('FoodItem', 'increase', params)
      }
    })
    this.$on('decrease', (params) => {
      if (params.listName === this.name) {
        this.broadcast('FoodItem', 'decrease', params)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.food-list {
  width: 100%;
  .list-header {
    padding: 0 0 0 .3rem;
    height: .4rem;
    border-bottom: .02rem solid #eeeeee;
    background-color: white;
    .list-label {
      font-size: 14px;
    }
    .list-description {
      font-size: 12px;
      color: gray;
      padding-left: .2rem;
    }
  }
  .fixedTop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 66;
  }
}
</style>