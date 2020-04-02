<template>
  <div class="hello">
    <nav class="navbar">
        <div v-if="token">
            <span><router-link to="/home" id="link" v-if="token">Home</router-link></span>

        </div>
        <div v-else>
            <span><router-link to="/login" id="link">Login</router-link></span>
            <span><router-link to="/register" id="link">Register</router-link></span>

        </div>

    </nav>
    <div class="center">
        <div id="title">
            <div id=image></div>
            <router-link to="/" style="text-decoration: none"><div class="heading"><strong>Writ</strong>able</div></router-link>
        </div>
        <!-- <p class="description">Share something beautiful with the world</p> -->
    </div>
    
  </div>
</template>

<script>
// import gql from 'graphql-tag';
export default {
    computed: {
        token(){
            return localStorage.getItem("apollo-token");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
    text-align:end;
    padding: 1vw;
}
#link{
    text-decoration: none;
    color: gray;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 2.4vh;
    z-index: 10;

}
.heading{
    /* font-family: 'Press Start 2P', cursive; */
    font-family: 'Inconsolata', monospace;
    /* font-family: 'La Belle Aurore', cursive; */
    /* font-size: 7vw; */
    font-size: 15vh;
    align-content: center;
    /* color: rgb(113, 212, 212); */
    color: rgb(76, 77, 78);
    z-index: 10;
    /* font-weight: lighter; */
}
.description{
    font-family: "Source Code Pro", sans-serif ;
    /* font-family: 'Sofia', cursive; */
    /* font-family: 'Amatic SC', cursive; */
    text-align: center;
    font-style: italic;
    color:rgb(128, 125, 125);
    /* font-size: 1.7vw; */
    font-size: 2.2vh;
    margin-top:0;
    padding: 0;
}
.center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
}
#image{
    background: url('../../public/quote.svg');
    height: 220vh;
    width: 220vh;
    background-repeat: no-repeat;
    background-size: contain;
    /* filter: blur(15px); */
    top: 30%;
    left: 40%;
    z-index: -1;
    transform: translate(-50%, -50%);
    position: fixed;
    filter: grayscale(60%);
    /* margin-right: 10vh;
    margin-top: -10vh;
    margin-left: -20vh; */
}
/* #title{
    display: flex;
    flex-direction: row;
} */
</style>
