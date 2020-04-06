<template>
  <div >
    <nav class="h-30 w-full p-2 navbar-color" >
        <router-link  to="/" style="text-decoration: none"><span  id="image" class="bg-no-repeat p-4 mr-4 ml-4"></span></router-link>
        <!-- <span class="search-img ml-8 p-3 z-10 absolute mt-1"></span> -->
        <input type="search" name="" class="h-8 w-64 ml-6 mr-4 p-3 outline-none border-none " placeholder="Search" @click="searchbox = !searchbox" v-model="search">
        <span class="float-right">
            <ApolloQuery :query="require('../graphql/queries/profilePhoto.graphql')"  >
                <template v-slot="{result: {data}, isLoading} ">
                    <button  v-if="!isLoading" class="  mr-4 ml-1 float-right p-1 border-none outline-none" v-on:click="menuPressed = !menuPressed">
                        <img class="rounded-sm h-6 w-6" :src="getImage(data.me.username)">
                    </button>
                    <button class="h-6 w-6 rounded-sm bg-gray-100 mr-4 ml-1 float-right p-2 mt-1" v-else></button>
                </template>

            </ApolloQuery>
        </span>
        <!-- <span>
            <button  class="p-1 mr-4 ml-4 text-gray-100 float-right outline-none border-none" v-on:click="logout">Log out</button>
        </span> -->
    </nav>
    <div v-show="menuPressed" class="h-24 w-32 mt-1 rounded shadow-md absolute mr-4 z-50 bg-white right-0 outline-none border-none">
        <button  class="p-3 mr-4 ml-6 text-gray-100 outline-none border-none text-gray-700 align-middle" v-on:click="logout">Log out</button>
        <router-link :to="{path: '/profiles/'+String(this.id)}" class="p-3 mr-4 ml-6 text-gray-100 outline-none border-none text-gray-700 align-middle" style="text-decoration: none">Profile
        </router-link>
    </div>
    <div class="mention-link w-64 h-56 absolute border-gray-200 shadow-md p-2 ml-24 mt-1"  v-show="searchbox" >
            <ApolloQuery 
            :query="require('../graphql/queries/users.graphql') "
            >
                <template  v-slot="{result: {data}}">
                <ul v-for="user in filteredUsers(data.users)"  v-bind:key="user"  >
                    <router-link :to="{path: '/profiles/'+String(user.id)}" class="mention-link ind mt-2 mb-2 w-56 border-gray-100 ml-2 mr-2" style="text-decoration: none">
                        <img id="profile-img" :src="getProfiles(user.username)">
                        <p>{{user.name}}</p>
                    </router-link>
                </ul>
                <!-- <p v-else>Loading..</p> -->
                </template>
            </ApolloQuery>
    
    </div>
    <br>

    <!-- <div class="dashboard">PROFILE</div> -->
    <ApolloQuery 
        :query="require('../graphql/queries/me2.graphql')"
        >
        <template  v-slot="{result: {loading, error, data}, isLoading}">
            <div class ="main-page flex-row justify-center">
                <div class="w-1/4 ml-6 mr-6 mt-6">
                    <div class="p-2" v-if="isData(data)">
                        <div  class=" h-60 w-60 mb-4 ">
                            <img class="rounded" :src="getImage(data.me.username)">
                        </div>
                        <div class="inf">
                            <h3 class="name mt-2"><b>{{data.me.name}}</b></h3>
                            <h5 class="username mt-2 font-bold"><b>@</b> {{data.me.username}}</h5>
                            <div class="extras mt-4 w-48" v-if="data.me.profile" >
                                <div class="mt-2" v-if="data.me.profile.description != null">
                                    <p  >{{data.me.profile.description}}</p>
                                </div>
                                <div class="mt-2 text-blue-300" v-if="data.me.profile.website != null">
                                    <a :href="data.me.profile.website" target="_blank">{{data.me.profile.website}}</a>
                                </div>
                            </div>
                            <!-- <ApolloQuery :query="require('../graphql/queries/count.graphql')">
                                <template v-slot="{result: {data}}"> -->
                            <div v-if="data.me" class=" extras flex-row justify-evenly mt-4 mb-2">
                                <span v-if="data.me.followers" class=" mr-2"><b>{{get(data.me.followers)}}</b> Follower</span>
                                <span v-else class=" mr-2"><b>0</b> Follower</span>
                                <span v-if="data.me.followings" class=" ml-2"><b>{{get(data.me.followings)}}</b> Following</span>
                                <span v-else class=" ml-2"><b>0</b> Following</span>
                            </div>
                                <!-- </template>
                            </ApolloQuery> -->
                            <div class="ch-profile">
                                <button class="w-48 h-10">
                                    <router-link to="/home/update" style="text-decoration: none" >Update Profile</router-link>
                                </button>
                                <br>
                                <button class="w-48 h-10">
                                    <router-link to="/post" style="text-decoration: none">Add a Post</router-link>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="ml-6 mr-6 w-2/4">
                    <div >
                        <div class="text-center text-gray-600 font-hairline"><b>My Nest</b></div>
                        <div v-if="data" >
                            <div v-if="data.me.followings">
                                <!-- <div v-show="data.me.followings.posts"> -->
                                    <ul v-for="post in arrange(data.me.followings)" :key="post" >
                                      <!-- {{post}} {{data.me.id}} {{post.id}} {{post.likes}} -->
                                        <div class="bg-gray-100 p-2 rounded mb-4 mt-4">
                                            <div class="mention">
                                                <img id="profile-img" :src="getImage(post.user.username)">
                                                <p>{{post.user.name}}</p>
                                            </div>
                                            <p class="post-heading">{{post.title}}</p>
                                            <p class="post-content">{{post.post}}</p>
                                            <!-- <ApolloQuery :query="require('../graphql/queries/checkMyLike.graphql')" >
                                                <template v-slot="{result: {data}}"> -->
                                            <div>
                                                <span v-if="seeLike(post.likes, data.me.id)">
                                                    <ApolloMutation
                                                    :mutation="require('../graphql/mutations/addLike.graphql')"
                                                    :variables="{post_id: post.id}">
                                                        <template v-slot="{mutate}">
                                                          <div class=" mb-2 mt-2 float-right p-1 flex-row ml-4">
                                                            <span class="mr-1">
                                                                <button class="heartl p-1" v-on:click="mutate()"></button>
                                                            </span>
                                                            <span class="ml-1 p-2 font-light likecounter mb-1">{{post.likes.length}}</span>
                                                          </div>
                                                        </template>
                                                    </ApolloMutation>
                                                </span>
                                                <span v-else>
                                                    <ApolloMutation
                                                    :mutation="require('../graphql/mutations/removeLike.graphql')"
                                                    :variables="{post_id: post.id}">
                                                        <template v-slot="{mutate}">
                                                          <div class=" mb-2 mt-2 float-right p-1 flex-row ml-4">
                                                            <span class="mr-1">
                                                              <button class="heart p-1" v-on:click="mutate()"></button>
                                                            </span>
                                                            <span class="ml-1 p-2 font-light likecounter mb-1">{{post.likes.length}}</span>
                                                          </div>

                                                        </template>
                                                    </ApolloMutation>
                                                </span>

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
            <div v-if="isLoading" class="main-page flex-row justify-center">
                <div class="w-1/4 h-screen bg-gray-100 mr-10 ml-4 box-content mt-2 rounded-sm"></div>
                <div class="h-screen w-3/5 bg-gray-100 ml-10 mr-4 box-content mt-2 rounded-sm" ></div>
            </div>
        </template>
    </ApolloQuery>
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


export default {
    components: {
        'footer-ele': footer
    },
    data(){
        return{
            searchbox: false,
            search: null,
            users: [],
            menuPressed: false,
            id: null
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
                }
                // arr = [arr.concat(postsArr[i][0])];
            }
            arr.sort();
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
    /* font-weight: lighter; */
    /* font-style: italic; */
    column-width: 40%;
}
.image{
    border-radius: 0.2rem;
    color:rgb(119, 116, 116);
}
.user{
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    padding: 20px;
    width: 20vw;
    margin-left: 1vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
}
.ch-profile{
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 20px;
    margin-top: 6vh;
    
}
.ch-profile button{
    font-family: 'Source Code Pro', sans-serif;
    font-size: 0.8rem;
    color: rgb(255, 255, 255);
    border: none;
    outline: none;
    background-color:rgb(141, 223, 228);
}
.ch-profile button:hover {
    color: rgb(141, 223, 228);
    border: 1px solid rgb(141, 223, 228);
    background-color:white;
}
.sidebar{
    background-color: rgb(255, 255, 255);
    margin-left: -10px;
    width: 25vw;
    margin-right: 1vw;
    z-index: 1;

}
.right-bar{
    padding: 10px;
    width: 70vw;
    border-top-left-radius: 0.2rem;
    border-left: 1px solid rgb(238, 236, 236);
    z-index: 1;
}
.main-page{
    display: flex;
    flex-direction: row;
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
    font-size: 2.5vh;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(128, 126, 126);
    padding: 2vw;
    width: 40vw;
    margin-left: 8vw;
    margin-right: 8vw;
}
.post-heading{
    font-size: 3vh;
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
    flex-direction: row;
    padding: 2vh;
    padding-bottom: 0;
}
.mention p{
    margin-top: 1.5vh;
}
#profile-img{
    height: 6vh;
    width: 6vh;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.2rem;
    margin-right: 2vh;
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
    margin-top: 1.5vh;
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
    font-family: 'Source Code Pro', sans-serif;
    font-size: 0.8rem;
    color: rgb(184, 181, 181);
}

</style>
