import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        change: 0,
        photo: null,
        likes: null,
        pressed: null,
        description: null,
        website: null,
        title: null,
        followings: null
    },
    getters: {
        
        checkPressed(state) {
            return state.pressed;
        },
        getFollowing(state) {
            return state.followings;
        }
       
    },
    mutations: {
        // reverse(state) {
        //     // alert("called");
        //     state.pressed = !state.pressed;
        //     // alert(state.likes);
        // },
        // setLikes(state, likes) {
        //     // alert(likes);
        //     state.likes = likes;
        // },
        // setPressed(state, cond) {
        //     // alert(cond);
        //     state.pressed = cond;
        // },
        // buttonSize(state, size) {
        //     state.pressed = new Array(size).fill(null);
        // },
        setDescription(state, desc){
            state.description = desc;
        },
        setWebsite(state, web) {
            state.website = web;
        },
        setFollowings(state, followings) {
            state.followings = followings;
        },
        increaseLikes(state, data) {
            state.followings[data.index].likes = state.followings[data.index].likes.concat({ liker_id: data.id, likes: state.followings[data.index].likes.length + 1 })
        },
        decreaseLikes(state, data) {
            if (state.followings[data.index].likes.includes({ liker_id: data.id, likes: state.followings[data.index].likes.length })) {
                state.followings[data.index].likes.delete(state.followings[data.index].likes.data.indexOf({ liker_id: data.id, likes: state.followings[data.index].likes.length }));
            }
        }

    }
});