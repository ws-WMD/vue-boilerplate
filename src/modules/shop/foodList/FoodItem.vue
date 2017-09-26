<template>
  <div class="food-item">
    <div class="food-img">
      <img :src="imgPath">
    </div>
    <div class="food-info">
      <span class="food-label">{{ label }}</span>
      <span class="food-description">{{ description }}</span>
      <span class="food-sales">{{ sales }}</span>
      <span class="food-price">{{ `￥${price}` }}</span>
    </div>
    <counter></counter>
  </div>
</template>

<script>
  import Counter from './Counter'

  export default {
    name: 'FoodItem',
    components: { Counter },
    props: {
      imgPath: {
        type: String,
      },
      id: {
        type: String,
      },
      name: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      description: {
        type: String,
      },
      sales: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
    data() {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
  .food-item {
    display: flex;
    position: relative;
    border-bottom: .02rem solid #eeeeee;
    padding: .05rem 0;
    .food-img {
      flex: 1;
      padding: 0 .3rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
        border: .01rem solid black;
      }
    }
    .food-info {
      flex: 1.8;
      span {
        display: block;
        margin-bottom: .1rem;
      }
      .food-label {
        font-size: 16px;
      }
      .food-description, .food-sales {
        font-size: 12px;
        color: gray;
      }
      .food-price {
        font-size: 20px;
        color: red;
      }
    }
  }
</style>