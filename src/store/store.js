import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        change: 0,
        photo: null,
        likes: null,
        pressed: null
    },
    getters: {
        getLike(state) {
            // alert("getting");
            // alert(state.likes);
            return state.likes;
        },
        checkPressed(state) {
            return state.pressed;
        }
    },
    mutations: {
        reverse(state) {
            // alert("called");
            state.pressed = !state.pressed;
            // alert(state.likes);
        },
        setLikes(state, likes) {
            // alert(likes);
            state.likes = likes;
        },
        setPressed(state, cond) {
            // alert(cond);
            state.pressed = cond;
        },
        buttonSize(state, size) {
            state.pressed = new Array(size).fill(null);
        }
    }
});