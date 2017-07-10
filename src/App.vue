<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <router-view transition transition-mode="out-in"></router-view>
  </div>
</template>