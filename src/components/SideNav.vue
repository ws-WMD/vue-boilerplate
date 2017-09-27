<template>
  <div class="side-nav">
    <div class="left">
      <ul class="nav">
        <li v-for="(item, index) in navList" :class="{ active: activeNav(item) }" @click="handleNavClick(index)">
          {{ item.label }}
          <i class="count" v-show="item.count > 0">{{ item.count }}</i>
        </li>
      </ul>
    </div>
    <div class="right" ref="content" @scroll="handleScroll"><slot name="content"></slot></div>
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
        navList: this.createCount(),
        activeKey: this.value,
      }
    },
    computed: {
      right() {
        return this.$refs.content
      },
      scrollEl() {
        return this.right.querySelector(`#${this.activeKey}`)
      },
    },
    methods: {
      createCount() {
        return this.nav.map((element) => {
          element.count = 0
          return element
        })
      },
      activeNav(item) {
        return item.name === this.activeKey
      },
      rightScrollTop() {
        return this.right.scrollTop
      },
      scrollToActive() {
        
      },
      handleNavClick(index) {
        this.activeKey = this.navList[index].name
        try {
          this.right.scrollTop = this.scrollEl.offsetTop
        }
        catch (e) {
          
        }
      },
      handleScroll() {
        this.$emit('content-scroll', this.rightScrollTop())
      },
    },
    mounted() {
      this.$on('scrolled', (name) => {
        this.activeKey = name
      })
      this.$on('increase', (params) => {
        this.navList = this.navList.map((element) => {
          if (element.name === params.listName) {
            element.count++
          }
          return element
        })
      })
      this.$on('decrease', (params) => {
        this.navList = this.navList.map((element) => {
          if (element.name === params.listName) {
            element.count--
          }
          return element
        })
      })
    },
    watch: {
      nav() {
        this.navList = this.createCount()
      },
      activeKey(val) {
        this.scrollToActive()
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
          position: relative;
          i {
            position: absolute;
            top: 0;
            right: 0;
            width: .2rem;
            height: .2rem;
            border: .01rem solid red;
            border-radius: 100%;
            margin: .12rem .12rem 0 0;
            display: block;
            color: white;
            background-color: red;
            font-style: normal;
            line-height: .2rem;
            text-align: center;
            font-size: 12px;
          }
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