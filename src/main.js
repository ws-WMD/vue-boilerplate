
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App';
import routes from './router';
import store from './store';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: new VueRouter({
    routes,
  }),
  store,
  template: '<App/>',
  components: { App }
})
