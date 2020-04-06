<template>
  <div class="hello">
    <nav class="navbar">
        <div v-if="token" class="justify-end">
            <span class="mr-4"><router-link to="/home" id="link" class="mr-2 ml-2" v-if="token">Home</router-link></span>

        </div>
        <div v-else class="justify-end">
            <span class="mr-4"><router-link to="/login" id="link" class="mr-2 ml-2">Login</router-link></span>
            <span class="mr-4"><router-link to="/register" id="link" class="mr-2 ml-2">Register</router-link></span>

        </div>

    </nav>
    <div>
        <!-- <div id="title"> -->
            <!-- <div id=image class="z-0 h-100 w-100  bg-no-repeat bg-contain" ></div> -->
            <div class="central"></div>
            <div class="heading">flow</div>
        <!-- </div> -->
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
    color: rgb(133, 130, 130);
    /* margin-left: 1.5vw;
    margin-right: 1.5vw; */
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;
    z-index: 10;

}
.heading{
    /* font-family: 'Source Code Pro', sans-serif; */
    /* font-family: 'Press Start 2P', cursive; */
    /* font-family: 'Inconsolata', monospace; */
    font-family: 'Petit Formal Script', cursive;
    /* font-family: 'La Belle Aurore', cursive; */
    /* font-size: 7vw; */
    top: 50%;
    color: gray;
    /* font-weight: bolder; */
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    font-size: 16vh;
    align-content: center;
    /* color: rgba(0, 128, 128, 0.838); */
    border: 1px solid gray;
    
    /* color: rgb(174, 176, 179);
    z-index: 10; */
    /* font-weight: lighter; */
}
/* .description{
    font-family: "Source Code Pro", sans-serif ;
    font-family: 'Sofia', cursive;
    font-family: 'Amatic SC', cursive;
    text-align: center;
    font-style: italic;
    color:rgb(128, 125, 125);
    font-size: 1.7vw;
    font-size: 2.2vh;
    margin-top:0;
    padding: 0;
} */
.central{
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100rem;
    width: 100rem;
    position: fixed;
    background-image: url('../../public/snowflake-alt (2).svg') ;
    /* background:linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(29, 28, 29, 0.3)); */
    background-blend-mode:overlay;
    background-size:cover;
    background-repeat: no-repeat;
}
#image{
    /* background: url('../../public/quote.svg'); */
    /* height: 220vh;
    width: 220vh; */
    /* background-repeat: no-repeat;
    background-size: contain;
    filter: blur(15px);
    top: 30%;
    left: 40%;
    z-index: -1;
    transform: translate(-50%, -50%);
    position: fixed;
    filter: grayscale(60%); */
    /* margin-right: 10vh;
    margin-top: -10vh;
    margin-left: -20vh; */
}
/* #title{
    display: flex;
    flex-direction: row;
} */
.central{
    /* background: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg'); */
    background-size: 100%;
    /* background-image: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg'); */
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    /* filter: blur(2px); */
    position: absolute;
    z-index: -1;
}
</style>
