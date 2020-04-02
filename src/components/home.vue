<template>
  <div >
    <nav>
        <router-link id="logo" to="/" style="text-decoration: none"><span id=image></span></router-link>
        <input type="search" name="" class="search" placeholder="Search" @click="searchbox = !searchbox" v-model="search">
        
        <div class="right">
            <button id="link" v-on:click="logout">Log out</button>
        </div>
    </nav>
    <div class="mention-link"  v-show="searchbox" >
            <ApolloQuery 
            :query="require('../graphql/queries/users.graphql') "
            >
                <template class="containers" v-slot="{result: {data}}">
                <ul v-for="user in filteredUsers(data.users)"  v-bind:key="user" >
                    <router-link :to="{path: '/profiles/'+String(user.id)}" class="mention-link ind" style="text-decoration: none">
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
        :query="require('../graphql/queries/me.graphql')"
        >
        <template  v-slot="{result: {loading, error, data}}">
            <div class ="main-page" >
                <div class="sidebar">
                    <div class="user" v-if="data">
                        <div  class="image">
                            <img id="img" :src="getImage(data)">

                        </div>
                        <div class="inf">
                            <h3 class="name"><b>{{data.me.name}}</b></h3>
                            <h5 class="username"><b>@</b> {{data.me.username}}</h5>
                            <div class="extras" v-if="data.me.profile" >
                                <div v-if="data.me.profile.description != null">
                                    <p  >{{data.me.profile.description}}</p>
                                </div>
                                <div v-if="data.me.profile.website != null">
                                    <p  >{{data.me.profile.website}}</p>
                                </div>
                            </div>
                            <div class="ch-profile">
                                <button>
                                    <router-link to="/home/update" style="text-decoration: none; color: white">Update Profile</router-link>
                                </button>
                                <br>
                                <button>
                                    <router-link to="/post" style="text-decoration: none; color: white">Add a Post</router-link>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="right-bar">
                    <div>
                        <div class="main "><b>My Nest</b></div>
                        <div v-if="data">
                            <div v-show="data.me.posts">
                                <ul v-for="post in data.me.posts" :key="post" >
                                    <div class="post">
                                        <div class="mention">
                                            <img id="profile-img" :src="getImage(data)">
                                            <p>{{data.me.name}}</p>
                                        </div>
                                        <p class="post-heading">{{post.title}}</p>
                                        <p class="post-content">{{post.post}}</p>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- <p v-else-if="error">Error..</p> -->
        </template>
    </ApolloQuery>
    
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import {onLogout} from '../vue-apollo';

export default {
    data(){
        return{
            searchbox: false,
            search: null,
            users: []
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
            return 'https://api.adorable.io/avatars/184/' + data.me.username + '@adorable.io.png';
        },
        getProfiles(data){
             return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
        filteredUsers(users){
            if(this.search == ''){
                this.search = null;
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
        }
    }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo{
    /* font-family: 'Playfair Display', serif; */
    font-family: 'La Belle Aurore', cursive;
    color: rgb(113, 212, 212);
    font-weight: lighter;
    padding: 1vw;
    font-size: 1.5vw;

    /* float: left; */
}
#image{
    background: url('../../public/quote.svg');
    height: 6vw;
    width:6vw;
    background-repeat: no-repeat;
    background-size: contain;
    padding:1vw;
    background-position: center;
    margin-top: 1vh;
    margin-left: 1.2vh;
    filter: grayscale(100%)

}
#link{
    text-decoration: none;
    color: rgb(221, 218, 218);
    /* margin-left: 1.5vw;
    margin-right: 1.2vw; */
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
    /* text-align: end; */
    /* float: right; */

}
/* nav:first-child{
    display: flex;
    float:left;
} */
nav .right{
    float: right;
    
}
nav{
    padding: 1vw;
    z-index: 32;
    background-color: #3a3b3b;
    margin-left: -10px;
    margin-right: -10px;
    margin-top: -10px;
    height: 3vw;
    /* position: fixed; */

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
    margin-bottom: 2vh;
}
.username{
    font-size: 1.5vw;
    color:rgb(116, 118, 119);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
    margin-top: 2vh;
    font-style: italic;
}
.extras{
    font-size: 1vw;
    color:rgb(119, 116, 116);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    font-style: italic;
    column-width: 40%;
}
.image{
    height: 15vw;
    width: 15vw;
    border-radius: 0.2rem;
    color:rgb(119, 116, 116);
    background-color: rgb(233, 230, 230);
}
.user{
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    /* margin-top: 0px; */
    padding: 20px;
    width: 20vw;
    /* position: fixed; */
    margin-left: 1vw;
    height: 100vh;
    /* background-color: rgb(247, 242, 242); */
    background-color: rgb(255, 255, 255);
    /* border-right: 1px solid rgb(209, 208, 208); */

    /* border-radius: 0.2rem; */
    /* margin-left: 10vw; */
}
/* .inf{
    margin-left: 40px;
} */
.ch-profile{
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    text-align: center;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 20px;
    margin-top: 6vh;
    
}
.ch-profile button{
    width: 15vw;
    height: 6vh;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1vw;
    color: rgb(148, 143, 143);
    border: none;
    outline: none;
    background-color:rgb(141, 223, 228);
}
.sidebar{
    /* width: 30vw; */
    /* background-color: rgb(247, 242, 242); */
    background-color: rgb(255, 255, 255);
    /* height: 100vw; */
    margin-left: -10px;
    /* position: fixed; */
    width: 25vw;
    margin-right: 1vw;
    z-index: 1;

}
/* .main-page{
    display: grid;

} */
.right-bar{
    padding: 10px;
    width: 70vw;
    /* background-color:rgb(247, 242, 242); */
    /* margin-right: -10px; */
    border-top-left-radius: 0.2rem;
    /* height: 100vw; */
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
    /* align-content: center; */
}
.post{
    background-color:rgba(255, 255, 255, 0.705);
    /* padding: 1vw; */
    width: 65vw;
    /* align-self: center; */
    margin-left: none;
    margin-right: none ; 
    border-radius: 0.2rem;
    border: 1px solid rgb(240, 237, 237);
    /* margin-right: none; */
}

.post-content{
    font-size: 2.5vh;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(128, 126, 126);
    padding: 2vw;
    /* text-align:left; */
    width: 40vw;
    margin-left: 8vw;
    margin-right: 8vw;
    /* margin-right: 1vw; */
}
.post-heading{
    font-size: 3vh;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(173, 170, 170);
    padding: 1vw;
    text-align: center;
    /* left: 5vw; */
    margin-right: 5vw;
    margin-left: 5vw;
}
/* #post-margin{
    width: 50vw;
} */
#img{
    /* background: url('../../public/user.svg'); */
    height: 15vw;
    width: 15vw;
    background-position: center;
    background-repeat: no-repeat;
    /* margin-top: 0.5vw;
    margin-left: 2.5vw; */
    /* filter: blur(1px); */
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
    /* margin-top: 0.5vw;
    margin-left: 2.5vw; */
    /* filter: blur(1px); */
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
    /* position: fixed; */
}
.search-result{
    width: 55vh;
    height: 30vh;
    border-radius: 0.2rem;
    /* border: 1px solid #969292; */
    /* z-index: -10; */
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
    padding: 0.5vh;
    padding-bottom: 0;
    border: 1px solid rgb(230, 228, 228);
    width: 41vh;
    border-radius: 0.2rem;
    

}
.mention-link.ind:hover{
    background-color:rgb(247, 242, 242);
    

}
div.mention-link{
    width: 55vh;
    margin-left: 19.8vh;
    border: none;
    background-color:rgb(255, 255, 255);
    box-shadow: 0 0 8px rgb(179, 178, 178);
    border-radius: 0.2rem;
    height: 25vh;
    /* scroll-behavior: auto; */
    z-index: 10;
    position: absolute;
    overflow-y: auto;
   

}
.mention-link p{
    margin-top: 1.5vh;
}
</style>
