<template>
  <div v-show="show"><slot></slot></div>
</template>

<script>
  export default {
    name: 'TabPane',
    props: {
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        show: true,
      }
    },
    methods: {
      toggle(visible) {
        this.show = visible
      },
    },
  }
</script>