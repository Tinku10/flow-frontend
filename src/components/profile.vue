<template>
  <div >
    <nav class="h-30 w-full p-3 bg-gray-800">
        <router-link  to="/" style="text-decoration: none"><span  id="image" class="bg-no-repeat p-4 mr-4 ml-4"></span></router-link>
        <span>
            <button  class=" mr-4 ml-4 text-gray-100 float-right outline-none" v-on:click="logout">Log out</button>
        </span>
    </nav>
    <br>
    <div >
        <ApolloQuery 
            :query="require('../graphql/queries/user.graphql')"
            :variables="{id: $route.params.id}"
            >
            <template  v-slot="{result: {loading, error, data}, isLoading}">
                <div class ="main-page flex-row justify-center" v-if="data">
                    <div class="w-1/4 ml-6 mr-6 mt-6">
                        <div class="p-2" v-if="data.user">
                            <div  class=" h-60 w-60 mb-4">
                                <img id="rounded" :src="getImage(data)">

                            </div>
                            <div class="inf">
                                <h3 class="name mt-2"><b>{{data.user.name}}</b></h3>
                                <h5 class="username mt-2 font-bold"><b>@</b> {{data.user.username}}</h5>
                                <div class="extras mt-4 w-48" v-if="data.user.profile" >
                                    <div class="mt-2" v-if="data.user.profile.description != null">
                                        <p  >{{data.user.profile.description}}</p>
                                    </div>
                                    <div class="mt-2" v-if="data.user.profile.website != null">
                                        <p  >{{data.user.profile.website}}</p>
                                    </div>
                                </div>
                                <div class="ch-profile">
                                    <button class="w-48 h-10">
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

                    <div class="ml-6 mr-6">
                        <div>
                            <div class="text-center text-gray-600"><b>{{data.user.name.split(' ')[0]}}'s Posts</b></div>
                            <div v-if="data">
                                <div v-show="data.user.posts">
                                    <ul v-for="post in data.user.posts" :key="post" >
                                        <div class="bg-gray-100 p-2 rounded mb-4 mt-4">
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
                <div v-if="isLoading" class="main-page flex-row justify-center">
                <div class="w-1/4 h-screen bg-gray-100 mr-10 ml-4 box-content mt-2"></div>
                <div class="h-screen w-3/5 bg-gray-100 ml-10 mr-4 box-content mt-2" ></div>
            </div>
            </template>
        </ApolloQuery>

    </div>
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


export default {
    components: {
        'footer-ele': footer
    },
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
    font-weight: lighter;
    font-style: italic;
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
    font-size: 1vw;
    color: rgb(148, 143, 143);
    border: none;
    outline: none;
    background-color:rgb(141, 223, 228);
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
</style>
