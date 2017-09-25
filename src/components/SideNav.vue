<template>
  <div class="side-nav">
    <div class="left">
      <ul class="nav">
        <li v-for="(item, index) in navList" :class="{ active: activeNav(item) }">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    name: 'SideNav',
    props: {
      nav: {
        type: Array,
        default: () => [],
      },
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        navList: this.nav,
        activeKey: this.value,
      }
    },
    methods: {
      activeNav(item) {
        return item.name === this.activeKey
      },
    },
  }
</script>

<style lang="scss" scoped>
  .side-nav {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: hidden;
    display: flex;
    flex: 1;
    .left, .right {
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .left {
      flex: 1;
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        li {
          padding: .35rem .15rem;
          border-bottom: .05rem solid #ededed;
          border-left: .1rem solid #f8f8f8;
        }
        .active {
          border-left: .1rem solid #3190e8;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 3;
    }
  }
</style>