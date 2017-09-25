<template>
  <div>
    <head-top>
      <span class="head--logo">ele.me</span>
    </head-top>
    <nav class="city--nav">
      <div class="city--tip">
        <span>当前定位城市:</span>
        <span>定位不准，请在城市列表中进行选择</span>
      </div>
    </nav>
    <div id='hot-city--container'>
      <h4 class="city-title">热门城市</h4>
      <ul class="city-list--ul clear">
        <router-link :to="'/msite' + item.id" v-for='item in hotCity' :key='item.id'>
          {{item.name}}
        </router-link>
      </ul>
    </div>
    <div class="group-city--container">
      <ul class="letter-classify--ul">
        <li class="letter-classify--li" v-for="(value, key, index) in sortGroupCity" :key='key'>
          <h4 class="city-title">{{key}}
            <span v-if='index == 0'>(按字母排序)</span>
          </h4>
          <ul class="groupcity-name--container city-list--ul clear">
            <router-link :to="'/msite' + item.id" v-for='item in value' :key='item.id' class='ellipsis'>
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/modules/head';
  import { hotCity, groupCity} from '@/service/getData';

  export default {
    data(){
      return {
        hotCity: [],
        groupCity: {},
      }
    },
    mounted() {
      hotCity().then(res => {
        return res.json();
      }).then(json => {
        this.hotCity = json.data;
      })
      groupCity().then(res => {
        return res.json();
      }).then(json => {
        this.groupCity = json.data;
      })
    },
    components: headTop,
    computed: {
      sortGroupCity() {
        let sortobj = {};
        const self = this;
        _.range(65, 91).map(value => {
          const charValue = String.fromCharCode(value);
          if(self.groupCity[charValue]) {
            sortobj[charValue] = self.groupCity[charValue];
          }
        });
        return sortobj;
      },
    },

    methods: {
      reload() {
        this.$router.push('/');
      }
    }
  }
</script>
<style lang='scss'>
@import '../style/mixin';
.city--nav{
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .city_tip{
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1){
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2){
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }
}
#hot-city--container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.city-list--ul {
  li{
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }
  li:nth-of-type(4n){
    border-right: none;
  }
}
.city-title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.55rem, 1.45rem, "Helvetica Neue");
  span{
    @include sc(0.475rem, #999);
  }
}
.letter-classify--li {
  margin-bottom: 0.4rem;
  background-color: #fff;
  border-bottom: 1px solid $bc;
  .groupcity_name_container{
    li{
      color: #666;
    }
  }
}
</style>
