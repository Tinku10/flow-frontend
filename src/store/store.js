import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        change: 0,
        photo: null
    }
    // mutations: {
    //     changeToken(state) {
    //         state.token = 
    //     }
    // }
});