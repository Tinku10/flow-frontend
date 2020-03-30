<template>
  <div>
    <nav>
        <router-link id="logo" to="/" style="text-decoration: none"><strong>Code</strong>Book</router-link>
        <div class="right">
            <button id="link" v-on:click="logout">Log out</button>
        </div>
    </nav>

    <!-- <div class="dashboard">PROFILE</div> -->
    <ApolloQuery 
        :query="require('../graphql/queries/me.graphql')"
        >
        <template  v-slot="{result: {loading, error, data}}">
            <div class ="main-page" >
                <div class="user" v-if="data">
                    <div  class="image">
                        <img src="#">
                    </div>
                    <div class="inf">
                        <h3 class="name"><b>{{data.me.name}}</b></h3>
                        <h5 class="username"><b>@</b> {{data.me.username}}</h5>
                        <div class="ch-profile">
                            <button>
                                <router-link to="/home/update" style="text-decoration: none; color: white">Update Profile</router-link>
                            </button>
                            <br>
                            <button>
                                <router-link to="/post" style="text-decoration: none; color: white">Your Posts</router-link>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="extras">
                    
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
#link{
    text-decoration: none;
    color: gray;
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
    color:rgb(119, 116, 116);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
    margin-top: 2vh;
    font-style: italic;
}
.image{
    height: 15vw;
    width: 15vw;
    border-radius: 0.2rem;
    color:rgb(119, 116, 116);
    background-color: rgb(206, 205, 205);
}
.user{
    display: flex;
    flex-direction: column;
    justify-content:top;
    /* margin-top: 0px; */
    padding: 50px;
    width: 20vw;
    height: 100vh;
    background-color: rgb(247, 242, 242);
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
    
}
.ch-profile button{
    width: 15vw;
    height: 2.5vw;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1vw;
    color: rgb(112, 111, 111);
    border: none;
    outline: none;
    background-color:rgb(190, 186, 186);
}
</style>
