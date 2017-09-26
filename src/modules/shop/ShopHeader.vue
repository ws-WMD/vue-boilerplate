<template>
  <div class="shop-header">
    <div class="shop-basic">
      <div class="shop-avatar">
        <img :src="avatarPath">
      </div>
      <div class="shop-info">
        <span class="shop-name">{{ shopName }}</span>
        <span class="shop-notice">{{ shortenShopNotice }}</span>
      </div>
    </div>
    <div class="shop-event">
      <span>满xx减xx，满xx减xx，满xx减xx</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-header',
    props: {
      avatarPath: {
        type: String,
        default: '',
      },
      shopName: {
        type: String,
        default: '店名'
      },
      shopNotice: {
        type: String,
        default: '公告：本店很清蒸，您值得拥有，快来选购吧~'
      }
    },
    data() {
      return {}
    },
    computed: {
      shortenShopNotice() {
        return this.shopNotice.length > 15 ? this.shopNotice.slice(0, 15) + '...' : this.shopNotice;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shop-header {
    height: 2.36rem;
    margin-top: .8rem;
    .shop-basic {
      padding: .2rem;
      display: flex;
      background-color: #E0FFFF;
    }
    .shop-avatar {
      flex: 1;
      padding: 0 .3rem;
      img {
        width: 1.7rem;
        height: 1.7rem;
        border: .01rem solid black;
      }
    }
    .shop-info {
      flex: 2;
      padding: .15rem;
      span {
        display: block;
        margin-bottom: .1rem;
      }
      .shop-name {
        font-size: 20px;
      }
      .shop-notice {
        font-size: 12px;
      }
    }
    .shop-event {
      font-size: 14px;
      margin: .2rem;
    }
  }
</style>