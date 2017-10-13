<template>
  <section>
    <header-top head-title="订单确认" goBack></header-top>
    <section class="choose-address">
      <router-link :to='{path:"/comfirmOrder/addAddress"}' class="address-wrap">
        <div class="address-wrap-left">
          <div v-if="!address">
            请添加一个收货地址
          </div>
          <div v-else>
            <span>{{address.name}}</span>
            <span>{{address.sex == 1? '先生':'女士'}}</span>
            <span>{{address.phone}}</span>
          </div>
        </div>
        <div class="address-wrap-right"> ></div>
      </router-link>
    </section>
    <section class="deliver-imfor">
      <div class="deliver-text">送达时间</div>
      <div class="deliver-time">
          <p>尽快送达 | 预计 {{checkoutData.reachTime}}</p>
          <p v-if="checkoutData.order.isDliverByFengniao">蜂鸟专送</p>
      </div>
    </section>
    <section class="pay-way">
      <header class="pay-way-header">
        <span>支付方式</span>
        <div class="more-type" @click="showMorePayFun">
          <span>{{payWayText}}</span>>
        </div>
      </header>
    </section>
    <transition name="slide-up">
      <div class="pay-type-wrap" v-if="showPayWay">
        <header class="pay-type-header">付款方式</header>
        <ul>
          <li v-for="(item, index) in checkoutData.payTypes" class="pay-way-item" :class="{'choose': payWayId == item.id}" @click="selectPayWay(item, index)">
            <span>{{item.name}}<span v-if="!item.isSupport">{{item.description}}</span></span>
          </li>
        </ul>
      </div>
    </transition>
    <section class="foodlist">
      <header class="food-shop" v-if="checkoutData.order.shopInfo">{{checkoutData.order.shopInfo.name}}</header>
      <ul class="food-list-ul" v-if="checkoutData.order.foods">
        <li v-for="item in checkoutData.order.foods" :key= "item.id" class="food-item">
          <p class="food-name ellipsis">{{item.name}}</p>
          <p class="num-price">
            <span class="food-num">x {{item.quantity}}</span>
            <span>¥{{item.price}}</span>
          </p>
        </li>
      </ul>
      <ul class="extra-list-ul" v-if="checkoutData.order.extra">
        <li v-for="item in checkoutData.order.extra" class="food-item">
          <p class="food-name ellipsis">{{item.name}}</p>
          <p class="num-price">
            <span></span>
            <span>¥{{item.price}}</span>
          </p>
        </li>
      </ul>
      <div class="food-item total-price">
        <p calss="num-price">
          <span class="food-num">待支付¥{{checkoutData.order.total}}</span>
        </p>
      </div>
    </section>
  	<section class="order-imfor">
  		<router-link :to='{path: "/comfirmOrder/remark"}' class="order-remark">
  			<span>订单备注 >></span>
        <span>{{remark}}</span>
  		</router-link>
  		<router-link :to='{path: "/comfirmOrder/checkTicket"}' class="ticket-title">
  			<span>发票抬头 >></span><span v-if="isNeedTicket">不需要开发票</span>
  		</router-link>
      <!-- <button @click="getRemark">获取备注</button> -->
  	</section>
  </section>

</template>


<script>
import {getStore, setStore} from '../../utils/base'
import headerTop from '@/components/header/header'
export default {
  components: {
    headerTop
  },
  data() {
    return {
      address: null,
      showPayWay: false,
      payWayId: '1',
      payWayText: '在线支付',
      checkoutData: {
        reachTime: '12:12',
        payTypes: [{
          id: '1',
          name: '在线支付',
          isSupport: true
        },{
          id: '2',
          name: '货到付款',
          isSupport: true,
          // description: '暂不支持'
        }],
        order: {
          shopInfo: {
            name: '测试店名'
          },
          foods: [{
            id: '12',
            name: '面包',
            quantity: '1',
            price: '2'
          },{
            id: '11',
            name: '火腿',
            quantity: '2',
            price: '3'
          },{
            id: '1222',
            name: '烤肠',
            quantity: '4',
            price: '5'
          }],
          extra: [{
            name: '配送费',
            price: '11'
          },{
            name: '餐盒费',
            price: '12'
          }],
          total: '123',
          isDliverByFengniao : true
        }
      },
      // remark: ''
    }
  },
  computed: {
    remark() {
      let remarkText = JSON.parse(getStore('remark')).remarkText;
      let inputText = JSON.parse(getStore('remark')).inputText,
          remarkArr = [];
      Object.keys(remarkText).forEach(item => {
         remarkArr.push(remarkText[item]);
      })
      remarkArr.push(inputText);
      let remark = remarkArr.join(',');

      return remark;
    },
    isNeedTicket() {
      console.log(JSON.parse(getStore('isNeedTicket')));
      return JSON.parse(getStore('isNeedTicket'));
    }
  },
   methods: {
    getRemark() {
      this.remark = JSON.parse(getStore('remark')).inputText;
    },

    showMorePayFun() {
      this.showPayWay = !this.showPayWay;
    },
    selectPayWay(item, index) {
      this.payWayId = item.id;
      this.payWayText = item.name;
      this.showPayWay = !this.showPayWay;
    }
  }
}
</script>

<style lang="scss" scoped>
  body {
    background: #eee;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin-top: 3px;
  }
  .order-remark {
      margin-bottom:2px;
    }
  .order-remark, .ticket-title {
    background: #fff;
    padding:10px;
    display:block;
    color: #000;
  }
  .food-shop {
    padding: 15px;
    background: #fff;
    border: 1px dashed #bcbbcc;
  }
  .food-name {
    display: inline-block;
    width: 80%;
  }
  .food-item {
    padding: 0 15px;
    background: #fff;
  }
  .num-price {
    display: inline-block;
  }
  .food-num {
    color:#ff0000;
    margin-right: 10px;
  }
  .total-price {
    padding: 1px 15px;
    margin-bottom: 10px;
  }
  .deliver-imfor {
    border-left: 7px solid #3190e8;
    min-height: 80px;
    background: #fff;
    margin-bottom: 10px;
  }
  .deliver-text {
    float: left;
    height: 80px;
    line-height: 80px;
    margin-left: 10px;
  }
  .deliver-time {
    float: right;
    margin-right: 10px;
    color: #3190e8;
  }
  .pay-way-header {
    padding: 15px;
    background: #fff;
  }
  .more-type {
    display: inline-block;
    float: right;
    margin-right: 5px;
    color: #bcbcbc;
  }
  .pay-type-wrap {
    position: fixed;
    background: #fff;
    width: 100%;
    bottom: 0;
    border-top: 2px solid #3190e8;
    padding: 15px;
  }
  .pay-type-header {
    color: #3190e8;
  }
  .pay-way-item {
    padding: 15px;
    cursor: pointer;
  }
  .slide-up-enter-active, .slide-up-leave-active {
  transition: all .5s ease
  }
  .slide-up-enter, .slide-up-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    bottom: -162px
  }
  .choose {
    color: #95de95;
  }
  .choose-address {
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
    border-bottom: 2px dashed #60e270;

  }
  .address-wrap-left {
    display:inline-block;
    color: #123;
  }
  .address-wrap-right {
    display:inline-block;
    float: right;
  }


</style>