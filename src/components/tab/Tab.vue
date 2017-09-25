<template>
  <div class="tab-container">
    <div>
      <ul>
        <li v-for="(item, index) in navList" :class="{ active: activeTab(item) }" @click="handleTabClick(index)">
          {{ item.label }}
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="tab-content"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      value: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        navList: [],
        activeKey: this.value,
      }
    },
    computed: {
      getTabs() {
        return this.$children.filter(item => item.$options.name === 'TabPane')
      },
    },
    methods: {
      activeTab(item) {
        return this.activeKey === item.name
      },
      updateNav() {
        this.getTabs.forEach((pane, index) => {
          this.navList.push({
            label: pane.label,
            name: pane.name,
          })
        })
      },
      updateVisiblePane() {
        this.getTabs.forEach((pane, index) => { pane.show = this.activeKey === pane.name })
      },
      handleTabClick(index) {
        this.activeKey = this.navList[index].name
      },
    },
    mounted() {
      this.updateNav()
    },
    watch: {
      value(val) {
        this.activeKey = val
      },
      activeKey() {
        this.updateVisiblePane()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tab-container {
    margin: .4rem 0;
  }
  ul {
    list-style-type: none;
    li {
      float: left;
      min-width: .8rem;
      height: .4rem;
      cursor: pointer;
      text-align: center;
    }
    .active {
      color: #3190e8;
      border-bottom: .02rem solid #3190e8;
    }
  }
  .clearfix {
    clear: both;
  }
</style>