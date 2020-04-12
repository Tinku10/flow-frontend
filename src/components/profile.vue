<template>
    <div >
        <nav-bar></nav-bar>
        <div>
        <ApolloQuery 
            :query="require('../graphql/queries/user.graphql')"
            :variables="{id: $route.params.id}"
            >
            <template  v-slot="{result: {loading, error, data}, isLoading}">
                <div class ="md:p-2 md:flex md:justify-evenly lg:justify-center" v-if="data">
                    <div class="mt-1  justify-between md:w-1/4 md:ml-6 md:mr-6 md:mt-2">
                        <div class="flex items-end justify-evenly ml-4 mr-4 md-4 md:flex-col md:p-2 md:ml-2 md:items-start" v-if="data.user">
                            <div  class="ml-4 mr-4 h-32 w-32  flex-shrink-0 md:h-40 md:w-40 md:mb-4 lg:h-48 lg:w-48">
                                <img id="h-32 w-32 md:h-40 md:w-40 md:mb-4 lg:rounded lg:h-48 lg:w-48" :src="getImage(data)">

                            </div>
                            <div class="flex-col items-start ml-4 md:items-start">
                                <h3 class="name md:mt-2"><b>{{data.user.name}}</b></h3>
                                <h5 class="username  md:mt-2 font-bold"><b>@</b> {{data.user.username}}</h5>
                                <div class="extras md:mt-4 w-48" v-if="data.user.profile" >
                                    <div class="md:mt-2" v-if="data.user.profile.description != null">
                                        <p  >{{data.user.profile.description}}</p>
                                    </div>
                                    <div class=" md:mt-2 text-blue-300" v-if="data.user.profile.website != null">
                                        <a :href="data.user.profile.website" target="_blank">{{data.user.profile.website}}</a>
                                    </div>
                                </div>
                                <div v-if="data.user" class="  extras  justify-evenly md:mt-4 md:mb-4">
                                    <span v-if="followers == null">
                                        <span v-if="data.user.followers" class=" mr-2"><b>{{getf(data.user.followers)}}</b> Follower</span>
                                        <span v-else class=" mr-2"><b>0</b> Follower</span>
                                    </span>
                                    <span v-else>
                                        <span v-if="followers.follower" class=" mr-2"><b>{{followers.follower}}</b> Follower</span>
                                        <span v-else class=" mr-2"><b>0</b> Follower</span>
                                    </span>
                                    <span v-if="data.user.followings" class=" ml-2"><b>{{get(data.user.followings)}}</b> Following</span>
                                    <span v-else class=" ml-2"><b>0</b> Following</span>
                                </div>
                                <div class="ch-profile flex sm:mt-2 md:flex-col">
                                    <ApolloQuery :query="require('../graphql/queries/me.graphql')">
                                        <template v-slot="{result: {data}}">
                                            <span v-if="isAuth() && data">
                                                <span v-if="followers == null ">
                                                    <ApolloMutation
                                                    :mutation="require('../graphql/mutations/follow.graphql')"
                                                    :variables="{id: $route.params.id}"
                                                    >
                                                        <template v-slot="{mutate}">
                                                            <!-- truke -->
                                                            <!-- <span v-if="data.me"> -->

                                                            <button class="w-20 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2  rounded-sm " v-on:click="mutate();unfollow(number)" v-if="checkFollow(data.me.followings, $route.params.id)">Unfollow</button>
                                                            <button class="w-20 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2  rounded-sm " v-on:click="mutate();follow(number)" v-else>Follow </button>
                                                            <!-- </span> -->
                                                        </template>
                                                    </ApolloMutation>
                                                </span>
                                                <span v-else>
                                                    <ApolloMutation
                                                    :mutation="require('../graphql/mutations/follow.graphql')"
                                                    :variables="{id: $route.params.id}"
                                                    >
                                                        <template v-slot="{mutate}">
                                                            <button class="w-20 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2 rounded-sm" v-on:click="mutate(); unfollow(number)"  v-if="followers.button == 'uf'">Unfollow</button>
                                                            <button class="w-20 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2 rounded-sm" v-on:click="mutate(); follow(number)" v-else>Follow </button>
                                                        
                                                        </template>
                                                    </ApolloMutation>
                                                </span>

                                            </span>
                                            <span v-else>
                                                <button class="w-20 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2 rounded-sm" v-on:click="banner=true;feature='follow a person'">Follow </button>
                                            </span>
                                        </template>
                                        
                                    </ApolloQuery>
                                    <br>
                                    <!-- <button>
                                        <router-link to="/post" style="text-decoration: none; color: white">Add a Post</router-link>
                                    </button> -->
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="ml-2 mr-2 md:ml-6 md:mr-6 md:ml-6 md:w-2/3 lg:w-2/4 lg:ml-8 lg:mr-8">
                        <div>
                            <div class="text-center text-gray-600 font-hairline mt-4 lg:mt-2"><b>{{data.user.name.split(' ')[0]}}'s Nest</b></div>
                            <div v-if="data">
                                <div v-show="arrange(data.user.posts)"> 
                                    <ul v-for="(post,index) in data.user.posts" :key="index" >
                                        <div class="bg-gray-100 p-2 rounded mb-4 mt-4 ml-2 mr-2">
                                            <div class="mention items-center lg:p-2">
                                                <img id="profile-img" :src="getImage(data)">
                                                <p>{{data.user.name}}</p>
                                            </div>
                                            <p class="post-heading">{{post.title}}</p>
                                            <p class="post-content ml-2 mr-2">{{post.post}}</p>
                                            <div>
                                                <ApolloQuery :query="require('../graphql/queries/me.graphql')">
                                                <template v-slot="{result: {data}}">
                                                <ApolloMutation 
                                                    :mutation="require('../graphql/mutations/addLike.graphql')"
                                                    :variables="{post_id: post.id}"
                                                    >
                                                        <template v-slot="{mutate}">
                                                            <!-- <span v-if="data.me"> -->

                                                                <span v-if="isAuth() ">
                                                                <div class=" mb-2 mt-2 float-right p-1 ml-4 flex" v-if="array[index].like == null">
                                                                    
                                                                    <div class="heartl p-2 mt-2 mr-1 cursor-pointer" v-if="seeLike(post.likes, data.me.id)" v-on:click="mutate(); like(post.likes.length, index)"></div>

                                                                    <div class="heart p-2 mt-2 mr-1 cursor-pointer" v-else v-on:click="mutate(); dislike(post.likes.length, index)"></div>

                                                                    <div class="p-2 font-light likecounter" >{{post.likes.length}}</div>

                                                                    
                                                                    
                                                                </div >
                                                                <div class=" mb-2 mt-2 float-right p-1 ml-4 flex" v-else>
                                                                    
                                                                    
                                                                    <div class="heartl p-2 mt-2 mr-1 cursor-pointer" v-if="array[index].color=='gray'" v-on:click="mutate(); like(likes[index], index)"></div>

                                                                    <div class="heart p-2 mt-2 mr-1 cursor-pointer" v-if=" array[index].color=='red'" v-on:click="mutate(); dislike(likes[index], index)"></div>

                                                                    <div class="p-2 font-light likecounter">{{array[index].like}}</div>
                                                                    
                                                                    
                                                                </div>
                                                                </span>
                                                                <span v-else>
                                                                    <!-- <div class="heartl p-2 mt-2 mr-1 cursor-pointer" v-if="seeLike(post.likes, data.me.id)" v-on:click="mutate(); like(post.likes.length, index)"></div> -->
                                                                    <div class=" mb-2 mt-2 float-right p-1 ml-4 flex" >

                                                                    <div class="heartl p-2 mt-2 mr-1 cursor-pointer"  v-on:click="banner=true; feature='like a post'"></div>

                                                                    <div class="p-2 font-light likecounter" >{{post.likes.length}}</div>
                                                                    </div>
                                                                </span>
                                                            <!-- </span> -->
                                                        </template>
                                                    </ApolloMutation>
                                                </template>
                                                </ApolloQuery>
                                            </div>
                                            <br> <br>
                                        </div>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <!-- <p v-else-if="error">Error..</p> -->
                <div v-if="isLoading" class="main-page flex flex-col md:justify-center md:flex-row">
                <div class="md:w-1/4 w-screen md:h-screen bg-gray-100 md:mr-10 md:ml-4 box-content mt-2 rounded-sm h-40 ml-2 mr-2"></div>
                <div class="h-screen w-screen md:w-3/5 bg-gray-100 md:ml-10 md:mr-4 box-content mt-2 rounded-sm  ml-2 mr-2" ></div>
            </div>
            </template>
        </ApolloQuery>

    </div>
    <transition name="fade">
        <div v-show="auth==false&& banner ==true" class="auth p-2 w-1/3 flex-col shadow-xl rounded">
            <p class="p-4 ml-2 mr-2 text-center">You need to be logged in to {{feature}}.</p>
            <div class="flex justify-center mt-4 mb-4">
                <button class="mr-4 ml-4 h-8 w-20"><router-link to="/login"  class="mr-2 ml-2">Login</router-link></button>
                <button class="mr-4 ml-4 h-8 w-20" @click="banner=false">Explore</button>

            </div>
        </div>

    </transition>
    <!-- <div class="dashboard">PROFILE</div> -->
    <br><br>
    <footer>
      <footer-ele></footer-ele>
    </footer>
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import {onLogout} from '../vue-apollo';
import footer from '../components/footer';
import navbar from '../components/navbar'



export default {
    components: {
        'footer-ele': footer,
        'nav-bar': navbar
    },
    data(){
        return{
            // id: this.$route.params.username,
            menuPressed: false,
            id: null,
            followers: null,
            number: null,
            likes: null,
            array: null,
            auth: false,
            banner: false,
            feature: ''
        }
    },
    computed: {
        token(){
            return this.$store.state.token
        }
    },
    methods: {
        
        logout(){
            onLogout(this.$apollo.provider.defaultClient);
            this.$router.push({path: '/'});

        },
        getImage(data){
            return 'https://api.adorable.io/avatars/184/' + data.user.username + '@adorable.io.png';
        },
        getMyImage(data){
            return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
        checkFollow(followings, id){
            for(let follow of followings){
                if(follow.id == id){
                    return true;
                }
            }
            return false;
        },
        get(data){
            if(localStorage.getItem("apollo-token")){
                this.auth= true;
            }
            this.auth= false;
            // this.number = data.length
            // this.followers = {follower: data.length, button: null};
            let arr = data;
            return arr.length;
        },
        getf(data){
            this.number = data.length
            // this.followers = {follower: data.length, button: null};
            let arr = data;
            return arr.length;
        },
        seeLike(data, id){
            if(data == []){
                return true;
            }else{
                for(let liker of data){
                    // console.log(liker);
                    if(liker.liker_id == id){
                        return false;
                    }
                }
                return true;
            }
        },
        follow(data){
            this.followers = {follower: data+1, button: 'uf'};
            this.number = data+1;
        },
        unfollow(data){
            this.followers = {follower: data-1, button: 'f'}
            this.number = data-1;
        },
        arrange(data){
            if(data){
                this.likes = new Array(data.length).fill(null);
                this.array = new Array(data.length).fill({like: null, color: null});
                return true;
            }
            return false;
        },
        like(data, index){
            this.array[index] = {like: data+1, color: 'red'};
            this.likes[index] = data+1;
            // return this.array[index].like;

        },
        dislike(data, index){
            this.array[index] = {like: data-1, color: 'gray'};
            this.likes[index] = data-1;
            // return this.array[index].like;

        },
        isAuth(){
            if(localStorage.getItem("apollo-token")){
                return true;
            }
            return false;
        }
        
    }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo{
    /* font-family: 'Playfair Display', serif; */
    font-family: 'La Belle Aurore', cursive;
  
}
#image{
    background: url('../../public/quote.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    filter: grayscale(100%)

}
#link{
    text-decoration: none;
    color: rgb(221, 218, 218);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1vw;
    padding: 1.2vw;
    border: none;
    outline: none;
    background: none;
    padding: 0;
    margin-right: 1vw;
    margin-top: 0.8vw;
    margin-bottom: 0.8vw;
    cursor: pointer;

}
.dashboard{
    text-align: center;
    font-size: 20px;
    color: rgb(119, 116, 116);
    padding: 3vh;
    font-family: 'Source Code Pro', sans-serif;
    margin-top: none;
    border: none;
}
.name{
    font-size: 1.4rem;
    color:rgb(119, 116, 116);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
}
.username{
    font-size: 1rem;
    color:rgb(116, 118, 119);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
    font-style: italic;
}
.extras{
    font-size: 0.6rem;
    color:rgb(119, 116, 116);
    font-family: "Source Code Pro", sans-serif;
    /* font-weight: lighter; */
    /* font-style: italic; */
    column-width: 40%;
}
.image{
    border-radius: 0.2rem;
    color:rgb(119, 116, 116);
}
.user{
    /* display: flex;
    flex-direction: column;
    justify-content:flex-start; */
    /* padding: 20px; */
    /* width: 20vw; */
    /* margin-left: 1vw; */
    /* height: 100vh; */
    background-color: rgb(255, 255, 255);
}
.ch-profile{
    /* display: flex; */
    /* flex-direction: column; */
    /* text-align: center; */
    font-family: 'Source Code Pro', sans-serif;
    font-size: 20px;
    /* margin-top: 6vh; */
    
}
.ch-profile button{
    font-family: 'Source Code Pro', sans-serif;
    font-size: 0.8rem;
    color: #ffffff;
    border: none;
    outline: none;
    background-color:rgb(141, 223, 228);
    font-size:0.7rem;
}
.ch-profile button:hover {
    color: rgb(141, 223, 228);
    border: 1px solid rgb(141, 223, 228);
    background-color:white;
}
.sidebar{
    background-color: rgb(255, 255, 255);
    /* margin-left: -10px; */
    /* width: 25vw; */
    /* margin-right: 1vw; */
    z-index: 1;

}
@media  (min-width: 768px){
    
    .name{
        font-size: 2vw;
        color:rgb(119, 116, 116);
        font-family: "Source Code Pro", sans-serif;
        font-weight: lighter;
    }
    .username{
        font-size: 1.5vw;
        color:rgb(116, 118, 119);
        font-family: "Source Code Pro", sans-serif;
        font-weight: lighter;
        font-style: italic;
    }
    .extras{
        font-size: 1vw;
        color:rgb(119, 116, 116);
        font-family: "Source Code Pro", sans-serif;
        /* font-weight: lighter;
        font-style: italic; */
        column-width: 40%;
    }
    .post-content{
        font-size: 2rem;
        font-family: "Source Code Pro", sans-serif;
        color:rgb(128, 126, 126);
        padding: 2vw;
        /* width: 40vw;
        margin-left: 5.5vw;
        margin-right: 8vw; */
    /* text-align: center; */
    }
    .ch-profile button{
        font-family: 'Source Code Pro', sans-serif;
        font-size: 0.8rem;
        color: #ffffff;
        border: none;
        outline: none;
        background-color:rgb(141, 223, 228);
    }
    
    
}
.right-bar{
    /* padding: 10px; */
    /* width: 70vw; */
    /* border-top-left-radius: 0.2rem; */
    /* border-left: 1px solid rgb(238, 236, 236); */
    z-index: 1;
}
.main-page{
    /* display: flex;
    flex-direction: row; */
    z-index: 1;
    
}
.main{
    color: rgb(92, 94, 94);
    font-size: 1.2vw;
    font-family: 'Nanum Gothic', sans-serif;
    margin: 0px;
    padding: 1vw;
    text-align: center;
}
.post{
    background-color:rgba(255, 255, 255, 0.705);
    width: 65vw;
    margin-left: none;
    margin-right: none ; 
    border-radius: 0.2rem;
    border: 1px solid rgb(240, 237, 237);
}

.post-content{
    font-size: 0.8rem;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(128, 126, 126);
    padding: 2vw;
    /* width: 40vw; */
    text-align: left;
    /* margin-left: 5.5vw;
    margin-right: 8vw; */
}
.post-heading{
    font-size: 1rem;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(173, 170, 170);
    padding: 1vw;
    text-align: center;
    margin-right: 5vw;
    margin-left: 5vw;
}
#img{
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.4rem;

}
.mention{
    font-family: "Source Code Pro", sans-serif;
    color: gray;
    display: flex;
    /* flex-direction: row; */
    /* padding: 2vh; */
    padding-bottom: 0;
}
.mention p{
    /* margin-top: 1.5vh; */
    
}
#profile-img{
    height: 2.4rem;
    width: 2.4rem;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.2rem;
    margin-right: 1rem;
}
.search{
    height: 5vh;
    width: 55vh;
    border-radius: 0.2rem;
    position: center;
    margin-left: 10vh;
    margin-top: 0.5vh;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 2vh;
    background-color:rgba(255, 255, 255, 0.918);
    padding: 2vh;
    outline: 0;
    border: none;
}
.search-result{
    width: 55vh;
    height: 30vh;
    border-radius: 0.2rem;
    margin-left: 20vh;
    outline: none;
    position: relative;
    background-color:rgb(255, 255, 255);
    box-shadow: 0 0 6px rgb(179, 178, 178);
}
.mention-link{
    font-family: "Source Code Pro", sans-serif;
    color: gray;
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
    border: 1px solid rgb(230, 228, 228);
    border-radius: 0.25rem;
    

}
.mention-link.ind:hover{
    background-color:rgb(247, 242, 242);
    

}
div.mention-link{
    border: none;
    background-color:rgb(255, 255, 255);
    border-radius: 0.2rem;
    z-index: 10;
    overflow-y: auto;
   

}
.mention-link p{
    align-items: center;
    /* margin-top: 1.5vh; */
}
.navbar-color{
    background-color: rgb(49, 49, 49);
}
.heart{
    background-image: url('../../public/heart.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 1.3rem;
    width: 1.3rem;
    outline: none;
}
.heartl{
    background-image: url('../../public/heart.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 1.3rem;
    width: 1.3rem;
    filter: grayscale(100%);
    outline: none;
}
.likecounter{
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: rgb(184, 181, 181);
}
.auth{
    /* height: 5rem;
    width: 10rem; */
    top: 50%;
    left: 50%;
    transform: translate(-50%,  -50%);
    position: fixed;
    background-color: white;
    font-family: 'Quicksand', sans-serif;
    color: rgb(100, 100, 100);
    font-size: 1.2rem;
    font-weight: lighter;
    /* border: 1px solid  rgb(161, 163, 163); */
    border-radius: 0.2rem;
}
.auth button{
    background: rgb(141, 223, 228);
    border-radius: 0.2rem;
    font-size: 0.8rem;
    color: white;
    font-weight: lighter;
    outline: rgb(141, 223, 228);

}
.auth button:hover{
    background: rgb(255, 255, 255);
    color: rgb(141, 223, 228);
    border: 1px solid rgb(141, 223, 228);

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
