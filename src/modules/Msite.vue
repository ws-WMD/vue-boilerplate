<template>
  <div>
    hello msite!
    <head-top signin-up='msite'>
      <router-link :to="'/search/' + geohash" class='link-search' slot='search'>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link class="msite-title" to='/home' slot='msite-title'>
        <span class="title-text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite-nav">
      <div class="swiper-container" v-if='foodTypes.length'>
        <div class="swiper-wrapper">
          <div class="swiper-slide food-types--container" v-for='(item, index) in foodTypes' :key='index'>
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper--pagination"></div>
      </div>
      <img class="fl-back animation-opacity" src="../images/fl.svg" v-else>
    </nav>
    <div class="shop-list--container">
      <header class="shop--header">
        <svg class="shop-icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop-header--title">附近商家</span>
      </header>
      <shop-list v-if='hasGetData' :geohash='geohash'></shop-list>
    </div>
    <!-- <foot-guide></foot-guide> -->
  </div>
</template>
<script>
import headTop from './head';
  import footGuide from '@/components/footGuide';
  import shopList from '@/components/shopList';
  import {msiteAddress, msiteFoodTypes, cityGuess} from '@/service/getData';

  import '../plugins/swiper.min.js';
  import '../style/swiper.min.css';
  export default {
    data() {
      return {
        geohash: '',
        msiteTitle: '请选择地址...',
        foodTypes: [],
        hasGetData: false,
        imgBaseUrl: 'http://fuss10.elemecdn.com',
      }
    },
    beforeMount() {
      if(!this.$route.query.geohash) {
        cityGuess().then((resp) => {
          const address = resp.data;
          this.geohash = address.latitude + ',' + address.longitude;
        })
      }else {
        this.geohash = this.$route.query.geohash
      }
    },
    mounted() {
      msiteFoodTypes(this.geohash).then(res => {
        const data = res.data;
        let resLength = res.length;
        let resArr = [...data];
        let foodArr = [];
        for(let i=0, j=0; i< resLength; i += 8, j++){
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      }).then(() => {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        });
      })
    },
    components: {
      headTop,
      shopList,
      footGuide,
    },
    computed: {
    },
    methods: {
      getCategoryId(url){
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        }else{
          return ''
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
@import '../style/mixin';
	.link-search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite-title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite-nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl-back{
			@include wh(100%, 100%);
		}
	}
	.food-types--container{
		display:flex;
		flex-wrap: wrap;
		.link-to-food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
