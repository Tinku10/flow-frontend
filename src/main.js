import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { createProvider } from './vue-apollo'
import {store} from './store/store'

import frontPage from './components/frontPage';
import register from './components/register';
import login from './components/login'
import home from './components/home'
import updateProfile from './components/updateProfile'
import profiles from './components/profiles'

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.config.productionTip = false

// const register = { template: <div>register</div> };
// const frontPage = {template: <div>frontPage</div>}


const routes = [
  { path: '/register', component: register },
  { path: '/', component: frontPage },
  { path: '/login', component: login },
  {
    path: '/home', component: home
    // beforeEnter: (to, from, next) => {
    //   if(to == '/login')
    // }
  },
  { path: '/home/update', component: updateProfile },
  {path: '/profiles', component: profiles}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
