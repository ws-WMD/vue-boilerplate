<template>
  <div class="counter">
    <span><i @click="handleDecrease" v-show="foodCount > 0" >-</i></span>
    <span><span v-show="foodCount > 0">{{ foodCount }}</span></span>
    <span><i @click="handleIncrease" class="increase-icon">+</i></span>
  </div>
</template>

<script>
  export default {
    name: 'Counter',
    props: {
      count: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        foodCount: this.count,
      }
    },
    methods: {
      handleIncrease() {
        this.foodCount++
        this.$emit('increase', this.foodCount)
      },
      handleDecrease() {
        this.foodCount--
        this.$emit('decrease', this.foodCount)
      },
    },
    watch: {
      count() {
        this.foodCount = this.count
      },
    },
    mounted () {
      this.$on('add', () => {
        this.foodCount++
      })
      this.$on('minus', () => {
        this.foodCount--
      })
    },
  }
</script>

<style lang="scss" scoped>
  $l: .2rem;
  .counter {
    display: flex;
    width: 1rem;
    height: $l + .02rem;
    text-align: center;
    &>span {
      display: block;
      flex: 1;
      i {
        display: block;
        margin: 0 auto;
        width: $l;
        height: $l;
        border: .01rem solid #3190e8;
        border-radius: 100%;
        line-height: $l;
        text-align: center;
        font-style: normal;
      }
      .increase-icon {
        color: white;
        background-color: #3190e8;
      }
    }
  }
</style>