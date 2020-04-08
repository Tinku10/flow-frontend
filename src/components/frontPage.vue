<template>
    <div>

    <div class="hello relative overflow-hidden">
        <nav class="navbar">
            <div v-if="token" class="justify-end">
                <span class="mr-4"><router-link to="/home" id="link" class="mr-2 ml-2" v-if="token">Home</router-link></span>

            </div>
            <div v-else class="justify-end">
                <span class="mr-4"><router-link to="/login" id="link" class="mr-2 ml-2">Login</router-link></span>
                <span class="mr-4"><router-link to="/register" id="link" class="mr-2 ml-2">Register</router-link></span>

            </div>

        </nav>
        <div class="relative h-screen w-screen">
            <!-- <div id="title"> -->
                <!-- <div id=image class="z-0 h-100 w-100  bg-no-repeat bg-contain" ></div> -->
                <div class="central absolute"></div>
                <div class="container flex ml-1 mr-1 absolute">
                    <div class="f">F</div><div class="l">L</div><div class="o">O</div><div class="w">W</div>
                </div>
            <!-- </div> -->
            <!-- <p class="description">Share something beautiful with the world</p> -->
        </div>
        
        
    </div>
    <!-- <div class="s2 relative p-10 mt-10 flex">
        <p class="info text-center p-4 mt-8 mb-8 ml-4 mr-4">Flow with the flow</p>
        <p class="italic p-8 info2 w-2/3 mr-4 mt-12 ml-4">The minimalist platform for sharing what you love. Join others who shares your passion.</p>
    </div>
    <div class="last relative p-10 flex-col justify-center">
        <p class="info text-center p-4 mt-8 mb-8 ml-4 mr-4">So, what are you thinking?</p>
        <router-link  class="justify-center flex mt-8" to="/register"><div  class="button">Sign Up</div></router-link>
        <p class="p-20 align-bottom info1 text-center p-4 mt-4 mb-8 ml-4 mr-4">Maybe you should write it down.</p>
    </div> -->
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
    /* font-family: 'Petit Formal Script', cursive; */
    /* font-family: 'La Belle Aurore', cursive; */
    /* font-size: 7vw; */
    font-family: 'Hind', sans-serif;
    top: 50%;
    color: gray;
    /* font-weight: bolder; */
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16vh;
    align-content: center;
    /* color: rgba(0, 128, 128, 0.838); */
    /* border: 1px solid rgb(128, 219, 241); */
    
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
    /* left: 18%; */
    left: 50%;
    transform: translate(-50%, -50%);
    /* height: 100rem;
    width: 100rem; */
    /* background-image: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg'); */
    /* background-image: url('../../public/time-lapse-photo-of-stars-on-night-924824.jpg') ; */
    /* background-image: url('../../public/alfred-kenneally-NHZUQR3d2VY-unsplash.jpg') ; */

    /* background:linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(29, 28, 29, 0.3)); */
    /* background-blend-mode:overlay; */
    /* background-size:contain; */
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
    /* background-size: 70%; */
    /* background-image: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg'); */
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    /* filter: blur(2px); */
    z-index: -1;
}
.container{
    justify-content: space-evenly;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    font-family: 'Hind', sans-serif;
    font-size: 6rem;
}
.o, .l{
    color:rgb(90, 89, 89);
}
.f, .w{
    color: rgb(156, 154, 154);
}
.info{
    font-family: 'Hind', sans-serif;
    font-size: 5rem;
    color: rgb(255, 255, 255);
    /* position: relative; */
}
.info1{
    font-family: 'Hind', sans-serif;
    font-size: 3rem;
    color: rgb(170, 169, 169);
    /* position: relative; */
}
.info2{
    font-family: 'Source Code Pro', sans-serif;
    font-size: 2rem;
    color: rgb(211, 211, 211);
}
.s2{
    /* background-color: rgb(0, 0, 0); */
    background-image: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg');
    /* background-size: 40%; */
    background-repeat: no-repeat;
    background-position: center;
}
.last{
    background-image: url('../../public/florian-klauer-mk7D-4UCfmg-unsplash.jpg');
}
.button{
    height: 5rem;
    width: 20rem;
    padding: 1.2rem;
    background: rgb(103, 222, 243);
    color: white;
    outline: none;
    border-radius: 0.2rem;
    text-align: center;
    font-size: 1.5rem;
}
.button:hover{
    background: rgb(255, 255, 255);
    color: rgb(103, 222, 243);
    border: 1px solid rgb(103, 222, 243);
}
</style>
