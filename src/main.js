
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App';
import routes from './router';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: new VueRouter({
    routes,
  }),
  template: '<App/>',
  components: { App }
})