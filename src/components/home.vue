<template>
  <div >
    <div class="relative">
        <div class="overlay absolute" v-if="$store.getters.getshowfollower == true || $store.getters.getshowfollowing ==true || banner == true"  @click="$store.commit('setshowfollower',false); $store.commit('setshowfollowing',false)">

        </div>
        <nav-bar class=""></nav-bar>

        <!-- <div class="dashboard">PROFILE</div> -->
        <div class="body">
        <ApolloQuery 
            :query="require('../graphql/queries/me2.graphql')"
            >
            <template  v-slot="{result: {loading, error, data}, isLoading}">
                <div class ="md:p-2 md:flex md:justify-evenly lg:justify-center">
                    <div class="mt-1  justify-between md:w-1/4 md:ml-6 md:mr-6 md:mt-2 md:items-start">
                        <div class="flex items-start justify-evenly ml-4 mr-4 md-4 md:flex-col md:p-2 md:items-start" v-if="isData(data)">
                            <div  class=" ml-4 mr-4 h-32 w-32  flex-shrink-0 md:h-40 md:w-40 md:mb-4 lg:h-48 lg:w-48 md:ml-2 ">
                                <img class="h-32 w-32 md:h-40 md:w-40 md:mb-4 lg:rounded lg:h-48 lg:w-48" :src="getImage(data.me.username)">
                            </div>
                            <div class="flex-col items-start ml-2 mr-2 md:items-start">
                                <h3 class="name md:mt-2"><b>{{data.me.name}}</b></h3>
                                <h5 class="username  md:mt-2 font-bold"><b>@</b> {{data.me.username}}</h5>
                                <div class="extras mt-2 md:mt-4 w-48" v-if="data.me.profile" >
                                    <div class="md:mt-2" v-if="data.me.profile.description != null">
                                        <p v-if="$store.getters.getDescription">{{$store.getters.getDescription}}</p>
                                        <p v-else >{{data.me.profile.description}}</p>
                                    </div>
                                    <div class="md:mt-2 text-blue-300" v-if="data.me.profile.website != null">
                                        <a :href="getWeb($store.getters.getWebsite)" target="_blank" v-if="$store.getters.getWebsite">{{$store.getters.getWebsite}}</a>
                                        <a :href="getWeb(data.me.profile.website)" target="_blank" v-else>{{data.me.profile.website}}</a>
                                    </div>
                                </div>
                                <!-- <ApolloQuery :query="require('../graphql/queries/count.graphql')">
                                    <template v-slot="{result: {data}}"> -->
                                <div v-if="data.me" class="extras  justify-evenly mt-2 mb-2 md:mt-4 md:mb-4">
                                    <span v-if="data.me.followers" class=" mr-2 cursor-pointer outline-none"  @click="$store.commit('setshowfollower',true)"><b>{{get(data.me.followers)}}</b> Follower</span>
                                    <span v-else class=" mr-2"><b>0</b> Follower</span>
                                    <span v-if="data.me.followings" class=" ml-2 cursor-pointer outline-none" @click="$store.commit('setshowfollowing',true)" ><b>{{get(data.me.followings)}}</b> Following</span>
                                    <span v-else class=" ml-2"><b>0</b> Following</span>
                                </div>
                                    <!-- </template>
                                </ApolloQuery> -->
                                <div class="ch-profile flex sm:mt-2 md:flex-col">
                                    <button class="w-20 mt-1 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2 md:mb-1 rounded-sm mr-1 md:mr-0">
                                        <router-link to="/update" style="text-decoration: none" >Update Profile</router-link>
                                    </button>
                                    <button class="w-20 mt-1 h-6 md:w-40 md:h-10 lg:w-48 lg:mt-2 md:mb-1 rounded-sm ml-1 md:ml-0">
                                        <router-link to="/post" style="text-decoration: none">Add a Post</router-link>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="ml-2 mr-2 md:ml-6 md:mr-6 md:ml-6 md:w-2/3 lg:w-2/4 lg:ml-8 lg:mr-8">
                        <div >
                            <div class="text-center text-gray-600 font-hairline mt-6 lg:mt-2"><b>My Nest</b></div>
                            <div v-if="data" >
                                <div v-if="data.me.followings" >
                                    <!-- <div v-show="data.me.followings.posts"> -->
                                        <ul v-for="(post,index) in arrange(data.me.followings)" :key="post.id" >
                                        <!-- {{post}} {{data.me.id}} {{post.id}} {{post.likes}} -->
                                            <div class="bg-gray-100 p-2 rounded mb-4 mt-4 ml-2 mr-2" >
                                                <router-link :to="{path: '/profiles/' + String(post.user.id)}" class="mention items-center lg:p-2">
                                                    <img id="profile-img" :src="getImage(post.user.username)">
                                                    <p>{{post.user.name}}</p>
                                                </router-link>
                                                <p class="post-heading">{{post.title}}</p>
                                                <p class="post-content ml-2 mr-2">{{post.post}}</p>
                                                <!-- <ApolloQuery :query="require('../graphql/queries/checkMyLike.graphql')" >
                                                    <template v-slot="{result: {data}}"> -->
                                                <div>
                                                    <!-- || isLiked(index, data.me.id)" -->
                                                    <span  >
                                                        <ApolloMutation 
                                                        :mutation="require('../graphql/mutations/addLike.graphql')"
                                                        :variables="{post_id: post.id}"
                                                        @done="onDone">
                                                            <template v-slot="{mutate}">
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
                                                            </template>
                                                        </ApolloMutation>
                                                    </span>
                                                    <!-- <span v-else>
                                                        <ApolloMutation 
                                                        :mutation="require('../graphql/mutations/addLike.graphql')"
                                                        :variables="{post_id: post.id}"
                                                        @donr="onDone">
                                                            <template v-slot="{mutate}">
                                                            <div class=" mb-2 mt-2 float-right p-1 ml-4 flex">
                                                                <div class="heart p-2 mt-2 mr-1 cursor-pointer" v-on:click="mutate();decreaseLike(index, data.me.id)"></div>
                                                                <div class="p-2 font-light likecounter" v-if="$store.state.followings">{{$store.state.followings[index].likes.length}}</div>
                                                                <div class=" p-2 font-light likecounter " v-else>{{post.likes.length}}</div>
                                                            </div>

                                                            </template>
                                                        </ApolloMutation>
                                                    </span> -->
                                                </div>
                                                <br> <br>
                                                    <!-- </template>
                                                </ApolloQuery> -->
                                            </div>
                                        </ul>
                                    <!-- </div> -->
                                </div>
                            </div>
                            
                        </div>
                    </div>


                </div>
                <!-- <p v-else-if="error">Error..</p> -->
                <div v-if="isLoading" class="main-page items-center flex flex-col md:justify-evenly md:flex-row">
                    <div class="md:w-1/4  md:h-screen bg-gray-100 md:mr-4 md:ml-4 box-content mt-2 rounded-sm h-initial  ml-2 mr-2 w-medium "></div>
                    <div class="h-mediump mt-6 md:h-screen  md:w-3/5 bg-gray-100 md:ml-4 md:mr-4 box-content md:mt-2 rounded-sm  ml-2 mr-2 w-medium " ></div>
                </div>
                
            </template>
        </ApolloQuery>
        </div>
        <br><br>
        <footer>
        <footer-ele></footer-ele>
        </footer>
        
    </div>
    <div v-show="$store.getters.getshowfollower" class="foll p-2 w-screen md:w-2/3 flex-col   bg-white border-gray-100 p-4 h-medium rounded-t md:h-screen md:w-1/3 md:rounded-none outline-none z-10" >
        <ApolloQuery :query="require('../graphql/queries/showff.graphql')">
            <template v-slot="{result: {data}}">
                <!-- <p v-if="isLoading">Loading..</p> -->
                <p class="text-center mb-4 mt-4">Followers</p>
                <div v-if="data">
                    <div v-if="data.me.followers">
                        <div  v-for="follower in data.me.followers" :key="follower.id">
                            <!-- <p>{{follower.name}}</p>
                            <p>{{follower.username}}</p> -->
                            <router-link :to="{path: '/profiles/' + String(follower.id)}" class="mention items-center lg:p-2" >
                                <div class="flex items-start mb-2 mt-2 ml-2 mr-2" @click="$store.commit('setshowfollower',false)">
                                    <img id="profile-img" :src="getImage(follower.username)">
                                    <div class="flex flex-col items-start">
                                        <p class="foln font-semibold">{{follower.name}}</p>
                                        <p class="folu">@ {{follower.username}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>

                    </div>

                </div>
            </template>
        </ApolloQuery>
    </div>
    <div v-show="$store.getters.getshowfollowing" class="foll p-2 w-screen md:w-2/3 flex-col   bg-white border-gray-100 p-4 h-medium rounded-t md:h-screen md:w-1/3 md:rounded-none outline-none z-10" >
        <ApolloQuery :query="require('../graphql/queries/showff.graphql')">
            <template v-slot="{result: {data}}">
                <!-- <p v-if="isLoading">Loading..</p> -->
                <p class="text-center mb-4 mt-4">Followings</p>
                <div v-if="data">
                    <div v-if="data.me.followings !=null">
                        <div v-for="following in data.me.followings" :key="following.id">
                            <!-- <p>{{follower.name}}</p>
                            <p>{{follower.username}}</p> -->
                            <router-link :to="{path: '/profiles/' + String(following.id)}" class="mention items-center lg:p-2" >
                                <div class="flex items-start mb-2 mt-2 ml-2 mr-2" @click="$store.commit('setshowfollowing',false)">
                                    <img id="profile-img" :src="getImage(following.username)">
                                    <div class="flex flex-col items-start">
                                        <p class="foln font-semibold">{{following.name}}</p>
                                        <p class="folu">@ {{following.username}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>

                    </div>

                </div>
            </template>
        </ApolloQuery>
    </div>
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
            searchbox: false,
            search: null,
            users: [],
            menuPressed: false,
            id: null,
            likecount: null,
            likeArr: [],
            pressed: null,
            color: null,
            array: null,
            likes: null,
            showfollower: false,
            showfollowing: false 
        }
    },
    computed: {
        token(){
            return this.$store.state.token;
        },
        searchResult(){
            return true;
        }
        // filteredUsers(){
        //     return 1
        // }
        
    },
    methods: {
        
        logout(){
            onLogout(this.$apollo.provider.defaultClient);
            this.$router.push({path: '/'});
        },
        getImage(data){
            // this.$store.state.photo = 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
            return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
        getProfiles(data){
             return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
        filteredUsers(users){
            if(this.search == ''){
                this.search = null;
            }else if(this.search == null){
                return users;
            }
            this.users = users;
            let filtered = [];
            for(let user of this.users){
                let name = user.name.toLowerCase();
                if(name.includes(this.search)){
                    filtered = filtered.concat(user);
                }
            }
            return filtered;
        },
        isData(data){
            if(data){
                this.id = data.me.id;
                return true
            }
            this.load = true;
            return false

        },
        arrange(postsArr){
            let arr = [];
            for(let i = 0; i<postsArr.length; i++){
                for(let j= 0; j<postsArr[i].posts.length; j++){
                    arr = arr.concat(postsArr[i].posts[j]);
                    
                // this.array = this.array.concat({like: ele.likes.length, color: 'red'})
                }
                // arr = [arr.concat(postsArr[i][0])];
            }
            arr.sort();
            this.likes = new Array(arr.length).fill(null);
            this.array = new Array(arr.length).fill({like: null, color: null});
            // this.$store.commit('setFollowings', arr);
            return arr;
        },
        get(data){
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
        onDone(data){
            this.likecount = data;
        },
        // increaseLike(index, id){
        // // increaseLike(index, id){
        //     this.$store.commit('increaseLikes', {index: index, id: id });
        // },
        // decreaseLike(index, id){
        //     this.$store.commit('decreaseLikes', {index: index, id: id });
        // },
        isLiked(index, id){
            let following = this.$store.getters.getFollowing;
            // console.log(following[0].likes);
            if (following[index].likes == []) {
                return true;
            } else {
                for (let liker of following[index].likes) {
                    // console.log(liker);
                    if (liker.liker_id == id) {
                        return false;
                    }
                }
                return true;
            }
        },
        turnOn(index, color){
            this.color = color;
            this.pressed = index;
        },
        getWeb(data){
            return 'https://' + data;
        }
        // make(post){
        //     // this.likeArr = followings;
        //     // for(let liker of post){
        //         // for(let post of liker.posts){
        //             this.likeArr = this.likeArr.concat(post);

        //         // }
        //     // }
        // }
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
        font-size: 0.8rem;
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
    .foll{
        /* height: 5rem;
        width: 10rem; */
        right: 0%;
        top: 0%;
        /* left: 50%; */
        /* transform: translate(-50%); */
        position: fixed;
        font-family: 'Quicksand', sans-serif;
        color: rgb(100, 100, 100);
        /* font-size: 1.2rem; */
        font-weight: lighter;
        /* border: 1px solid  rgb(161, 163, 163); */
        /* border-radius: 0.2rem; */
        overflow:auto;
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
.body{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
}
.foln, .folu{
    font-family: 'Source Code Pro', sans-serif;
    font-size: 0.9rem;
}
.folu{
    font-size: 0.8rem;
}
.foll{
    /* height: 5rem;
    width: 10rem; */
    bottom: 0%;
    /* left: 50%; */
    /* transform: translate(-50%); */
    position: fixed;
    font-family: 'Quicksand', sans-serif;
    color: rgb(100, 100, 100);
    /* font-size: 1.2rem; */
    font-weight: lighter;
    /* border: 1px solid  rgb(161, 163, 163); */
    /* border-radius: 0.2rem; */
    overflow:auto;
}
.overlay{
    background: rgb(53, 53, 53);
    /* position: absolute; */
    height: 100%;
    width: 100%;
    filter: opacity(50%);
    z-index: 5;
}
</style>
