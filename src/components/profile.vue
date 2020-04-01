<template>
  <div >
    <nav class="navbar">
        <router-link id="logo" to="/" style="text-decoration: none"><span id=image></span></router-link>

        <div class="right">
            <button id="link" v-on:click="logout">Log out</button>
        </div>
    </nav>
    <br>
    <div>
        <ApolloQuery 
            :query="require('../graphql/queries/user.graphql')"
            :variables="{id: $route.params.id}"
            >
            <template  v-slot="{result: {loading, error, data}}">
                <div class ="main-page" v-if="data">
                    <div class="sidebar">
                        <div class="user" v-if="data.user">
                            <div  class="image">
                                <img id="img" :src="getImage(data)">

                            </div>
                            <div class="inf">
                                <h3 class="name"><b>{{data.user.name}}</b></h3>
                                <h5 class="username"><b>@</b> {{data.user.username}}</h5>
                                <div class="extras" v-if="data.user.profile" >
                                    <div v-if="data.user.profile.description != null">
                                        <p  >{{data.user.profile.description}}</p>
                                    </div>
                                    <div v-if="data.user.profile.website != null">
                                        <p  >{{data.user.profile.website}}</p>
                                    </div>
                                </div>
                                <div class="ch-profile">
                                    <button>
                                        <router-link to="#" style="text-decoration: none; color: white">Follow</router-link>
                                    </button>
                                    <br>
                                    <!-- <button>
                                        <router-link to="/post" style="text-decoration: none; color: white">Add a Post</router-link>
                                    </button> -->
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="right-bar">
                        <div>
                            <div class="main "><b>{{data.user.name.split(' ')[0]}}'s Posts</b></div>
                            <div v-if="data">
                                <div v-show="data.user.posts">
                                    <ul v-for="post in data.user.posts" :key="post" >
                                        <div class="post">
                                            <div class="mention">
                                                <img id="profile-img" :src="getImage(data)">
                                                <p>{{data.user.name}}</p>
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
    <!-- <div class="dashboard">PROFILE</div> -->
    
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import {onLogout} from '../vue-apollo';

export default {
    data(){
        return{
            id: this.$route.params.username
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
    height: 6vh;
    width:6vh;
    background-repeat: no-repeat;
    background-size: contain;
    padding:15px;
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
    margin-top: 0.6vw;
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

}
/* .main-page{
    display: grid;

} */
.right-bar{
    width: 75vw;
    background-color:rgb(247, 242, 242);
    margin-right: -10px;
    /* height: 100vw; */
    /* border: 1px solid rgb(238, 236, 236); */

}
.main-page{
    display: flex;
    flex-direction: row;
    
}
.main{
    color: rgb(92, 94, 94);
    font-size: 1.2vw;
    font-family: 'Nanum Gothic', sans-serif;
    margin: 0px;
    padding: 1vw;
    text-align: center;
    align-content: center;
}
.post{
    background-color:rgba(255, 255, 255, 0.705);
    /* padding: 1vw; */
    width: 68vw;
    border-radius: 0.2rem;
}
.post-content{
    font-size: 2.5vh;
    font-family: "Source Code Pro", sans-serif;
    color:rgb(128, 126, 126);
    padding: 2vw;
    /* text-align:left; */
    width: 50vw;
    margin-left: 8vw;
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

</style>
