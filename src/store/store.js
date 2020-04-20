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
        followings: null,
        showfollowing: false,
        showfollower: false
    },
    getters: {
        
        checkPressed(state) {
            return state.pressed;
        },
        getFollowing(state) {
            return state.followings;
        },
        getDescription(state){
            return state.description;
        },
        getWebsite(state) {
            return state.website;
        },
        getshowfollowing(state){
            return state.showfollowing;
        },
        getshowfollower(state) {
            return state.showfollower;
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
        setshowfollowing(state, cond) {
            state.showfollowing = cond;
        },
        setshowfollower(state, cond) {
            state.showfollower = cond;
            
        }
        

    }
});