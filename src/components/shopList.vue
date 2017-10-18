<template>
  <div class="shoplist--container">
    <ul v-load-more='loaderMore' v-if="shopListArr.length" type='1'>
      <router-link :to="{path: 'shop', query: {geohash, id: item.id}}" v-for="item in shopListArr" tag='li' :key='item.id' class='shop--li'>
        <section>
          <img class="shop--img" :src="imgBaseUrl + item.image_path" alt="">
        </section>
        <hgroup class="shop--right">
        <header class="shop-detail--header">
          <h4 class="shop--title ellipsis" :class="item.is_premium? 'premium': ''"></h4>
        </header>
        <h5 class="rating-order-num">
          <section class="rating-order-num-left">
            <section class='rating--section'>
              <rating-star :rating='item.rating'></rating-star>
              <span class="rating-num">{{item.rating}}</span>
            </section>
            <section class="order--section">
              月售{{item.recent_order_num}}单
            </section>
          </section>
          <section class="rating-order-num-right">
            <span class="delivery-style delivery-left" v-if='item.delivery_mode'>{{item.delivery_mode.text}}</span>
            <span class="delivery-style delivery-right" v-if='zhunshi(item.supports)'>准时达</span>
          </section>
        </h5>
        <h5 class="fee-distance">
          <p class="fee">
          ￥{{item.float_minimum_order_amount}}起送
          <span class="segmentation">/</span>
          {{item.piecewise_agent_fee.tips}}
          </p>
          <p class="distance-time">
          <span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
            <span class="segmenta">/</span>
          </span>
          <span v-else>{{item.distance}}</span>
          <span class="segmentation">/</span>
          <span class="order-time">{{time.order_lead_time}}</span>
          </p>
        </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation-opacity">
      <li class="list-back--li" v-for='item in 10' :key='item'>
        <img class="list-back-svg" src="../images/shopback.svg" alt="">
      </li>
    </ul>
    <p class="empty-data" v-if='touchend'>没有更多了</p>
    <aside class="return-top" @click='backTop' v-if='showBackStatus'>
      <svg class="back-top-svg">
        <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#backtop'></use>
      </svg>
    </aside>
    <div ref='abc' style='background-color: red;'></div>
    <transition name='loading'>
    <loading v-show='showLoading'></loading>
    </transition>
  </div>
</template>
<script>
import {shopList} from '../service/getData';
  const imgBaseUrl = 'http://images.cangdu.org/';
  import { loadMore, getImgPath} from './mixin';
  import loading from './loading';
  import ratingStar from './ratingStar';

  export default {
    data() {
      return {
        offset: 0,
        shopListArr: [],
        preventRepeatReuqest: false,
        showBackStatus: false,
        showLoading: true,
        touchend: false,
        imgBaseUrl,
      }
    },
    mounted() {
      this.initData();
    },
    components: {
      loading,
      ratingStar,
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    methods: {
      initData() {
        shopList(this.offset, this.restaurantCategoryId).then((data) => {
          let res = data;
          this.hideLoading();
          this.shopListArr = [...this.shopListArr, ...res];
          if(res.length< 20) {
            this.touchend = true;
            return
          }
          this.preventRepeatReuqest = false;
        })
      },

      backTop() {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      },

      listenPropChange() {
        this.showLoading = true;
        this.offset = 0;
        return shopList(this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
      },

      hideLoading() {
        this.showLoading = false;
      },

      zhunshi(supports){
        let zhunStatus;
        if((supports instanceof Array) && supports.length) {
          supports.forEach(item => {
            if(item.icon_name === '准'){
              zhunStatus = true;
            }
          })
        }else {
          zhunStatus = false;
        }
        return zhunStatus;
      },
    },

    watch: {

      restaurantCategoryIds: function(value) {
        this.listenPropChange().then(data => {
          this.hideLoading();
          this.shopListArr = [...data];
        })
      },

      sortByType: function(value) {
        this.listenPropChange().then(data => {
          this.hideLoading();
          this.shopListArr = [...data];
        })
      },

      confirmSelect: function(value) {
        this.listenPropChange().then(data => {
          this.hideLoading();
          this.shopListArr = [...data];
          this.$emit('DidConfrim');
        })
      },
    }

  }
</script>
<style lang='scss' scoped>
@import '../style/mixin';
.shoplist--container {
  background-color: #fff;
  margin-bottom: 2rem;
}
.shop--li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}
.shop--img {
  @include wh(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
}

.list-back--li {
  height: 4.85rem;
  .list-back-svg {
    @include wh(100%, 100%)
  }
}
.shop--right {
  flex: auto;
  .shop-detail--header {
    @include fj;
    align-items: center;
    .shop--title {
      width: 8.5rem;
      color: #333;
      padding-top: 0.01rem;
      @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
      font-weight: 700;
    }
  }
}
</style>
