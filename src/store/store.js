import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        change: 0
    }
    // mutations: {
    //     changeToken(state) {
    //         state.token = 
    //     }
    // }
});