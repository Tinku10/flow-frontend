import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { createProvider } from './vue-apollo'
import frontPage from './components/frontPage';
import register from './components/register';
import login from './components/login'
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.config.productionTip = false

// const register = { template: <div>register</div> };
// const frontPage = {template: <div>frontPage</div>}

const routes = [
  { path: '/register', component: register },
  { path: '/', component: frontPage },
  {path: '/login', component: login}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
