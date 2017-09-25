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
    <div>
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
        this.hotCity = res.data;
      })
      groupCity().then(res => {
        this.groupCity = res.data;
      })
    },
    components: headTop
  }
</script>
<style lang='scss'>
h3 {
  .hello {

  }
}
</style>
