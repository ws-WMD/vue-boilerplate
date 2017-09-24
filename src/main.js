import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import Components from './components'

Vue.use(VueRouter)
Vue.use(Components)

new Vue({
  el: '#app',
  router: new VueRouter({
    routes,
  }),
  template: '<App/>',
  components: { App }
})