<template>
  <div>
    <ul>
      <li></li>
    </ul>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default: () => {
          return [{}]
        }
      }
    }
  }
</script>