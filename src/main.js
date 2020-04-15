import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { createProvider } from './vue-apollo'
import {store} from './store/store'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

import frontPage from './components/frontPage';
import register from './components/register';
import login from './components/login'
import home from './components/home'
import updateProfile from './components/updateProfile'
// import profiles from './components/profiles'
import post from './components/post'
import profile from './components/profile'
import pagenotfound from './components/pagenotfound'

import '@/assets/css/tailwind.css'

import { required, email } from 'vee-validate/dist/rules';

Vue.use(Vuelidate);
Vue.use(VueRouter);

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

extend('email', {
  ...email,
  message: 'This field expects a proper email address'
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Passwords do not match'
});

// extend('username', {
//   validate(value, data) {
//     return data.includes(value)
//   },
//   params: ['data']
//   // message: 'Your username needs to have at least 4 characters'
// });

extend('minCh', value => {
  if (value.length >= 8 ){
    return true
  }
  return 'Your password needs to have at least 8 characters'
})

extend('upperCase', value => {
  if (value.match(/[A-Z]/g) !== null) {
    return true
  }
  return 'Your password needs to have at least one upper case letter'
});

extend('lowerCase', value => {
  if (value.match(/[a-z]/g) !== null) {
    return true
  }
  return 'Your password needs to have at least one lower case letter'
});

extend('number', value => {
  if (value.match(/[0-9]/g) !== null) {
    return true
  }
  return 'Your password needs to have at least one numeral'
});


// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


Vue.config.productionTip = false

// const register = { template: <div>register</div> };
// const frontPage = {template: <div>frontPage</div>}

// Vue.filter('search', function (data) {
  
// })

const routes = [
  { path: '/register', component: register },
  { path: '/', component: frontPage },
  { path: '/login', component: login,
    beforeEnter(to, from, next){
          if (localStorage.getItem("apollo-token")) {
            next({
              path: '/home'
            });
          }
          else{
            next();
          }
    }
  },
  {
    path: '/home', component: home,
    beforeEnter(to, from, next){
      if (localStorage.getItem("apollo-token")) {
        next();
      }
      else {
        next({
          path: '/login'
        })
        
      }
    }
    // beforeEnter: (to, from, next) => {
    //   if(to == '/login')
    // }
  },
  {
    path: '/update', component: updateProfile,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("apollo-token")) {
        next();
      }
      else {
        next({
          path: '/login'
        })

      }
    }
  },
  // { path: '/profiles', component: profiles },
  {
    path: '/post', component: post,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("apollo-token")) {
        next();
      }
      else {
        next({
          path: '/login'
        })

      }
    }
  },
  { path: '/profiles/:id', component: profile },
  {path: '/*', component: pagenotfound}
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
