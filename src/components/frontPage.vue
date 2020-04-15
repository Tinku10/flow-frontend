<template>
    <div class="background overflow-hidden">

    <div class="hello relative overflow-hidden ">
        <div class="overlay"></div>
        <nav class="navbar flex flex-row items-center mt-4 z-50" >
            <div class="flex items-center fixed z-50">
                <img class="lens md:ml-1" src="../../public/search.svg" alt="">
                <input type="text" name="" class="ml-10 w-40 lg:p-3 outline-none border-none lg:resultbox  rounded-sm font-thin md:ml-16" placeholder="Search" @blur="searchbox=false" @focus="searchbox = true"   v-model="search">
            </div>

            <div v-if="token" class="justify-end fixed right-0 z-50">
                <span class="mr-4 "><router-link to="/home" id="link" class="mr-2 ml-2" v-if="token">Home</router-link></span>

            </div>
            <div v-else class="justify-end fixed right-0 z-50">
                <span class="mr-4"><router-link to="/login" id="link" class="mr-2 ml-2">Login</router-link></span>
                <span class="mr-4"><router-link to="/register" id="link" class="mr-2 ml-2">Register</router-link></span>

            </div>

        </nav>
        <transition name="slide-fade">
        <div class="mention-link md:ml-2 md:float-left border-gray-200 shadow-md md:p-2  mt-10 result w-screen md:ml-1 md:mt-6 fixed z-10 "  v-show="searchbox" >
            <ApolloQuery 
            :query="require('../graphql/queries/users.graphql') "
            >
                <template  v-slot="{result: {data}}">
                <span v-if="data">
                    <ul v-for="user in filteredUsers(data.users)"  :key="user.id"  >
                        <router-link :to="{path: '/profiles/'+String(user.id)}" class="mention-link ind mt-2 mb-2 w-56 border-gray-100 ml-2 mr-2" style="text-decoration: none">
                            <img id="profile-img" :src="getProfiles(user.username)">
                            <p class="items-center">{{user.name}}</p>
                        </router-link>
                    </ul>
                </span>
                <!-- <p v-else>Loading..</p> -->
                </template>
            </ApolloQuery>

        </div>
        </transition>
        <div class="relative h-screen w-screen">
            <!-- <div id="title"> -->
                <!-- <div id=image class="z-0 h-100 w-100  bg-no-repeat bg-contain" ></div> -->
                <div class="central absolute"></div>
                <div class="container flex ml-1 mr-1 absolute text-transparent">
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
    data(){
        return{
            searchbox: false,
            search: null,
            users: null
        }
    },
    computed: {
        token(){
            return localStorage.getItem("apollo-token");
        }
    },
    methods: {
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
        getProfiles(data){
             return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
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
    color: rgba(110, 107, 107, 0.712);
    /* margin-left: 1.5vw;
    margin-right: 1.5vw; */
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;
    /* z-index: 10; */

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


.central{
    /* background: url('../../public/gareth-david-m0chaAschUw-unsplash.jpg'); */
    /* background-size: 70%; */
    /* background-image: url('../../public/mathew-schwartz-3SWQCLmxH1U-unsplash.jpg'); */
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
    top: 45%;
    transform: translate(-50%, -50%);
    /* font-family: 'Hind', sans-serif; */
    font-family: 'Josefin Sans', sans-serif;
    font-variation-settings: 'wght' 100, 'wdth' 85;
	animation: breathe 4000ms infinite forwards;
    font-size: 6rem;
    /* z-index: 100; */
    color: rgba(43, 138, 202, 0.37);

}
@keyframes breathe {
	60% {
		font-variation-settings: 'wght' 700, 'wdth' 100;
	}

	100% {
		font-variation-settings: 'wght' 100, 'wdth' 85;
	}
}
/* .o, .l{
    color:rgb(66, 65, 65);
}
.f, .w{
    color: rgb(148, 165, 168);
} */
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

.mention-link{
    font-family: "Source Code Pro", sans-serif;
    color: gray;
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
    /* border: 1px solid rgb(230, 228, 228); */
    border-radius: 0.25rem;
    /* width: 32.5vw; */
    

}
.mention-link.ind:hover{
    background-color:rgb(247, 242, 242);
    

}
div.mention-link{
    border: none;
    background-color:rgb(255, 255, 255);
    border-radius: 0.2rem;
    z-index: 10;
    /* overflow-y:scroll; */
   

}
.mention-link p{
    /* margin-top: 1.5vh; */
}
#profile-img{
    height: 2rem;
    width: 2rem;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.2rem;
    margin-right: 2vh;
}
/* .search{
    height: 5rem;
    width: 30rem;
    border-radius: 0.2rem;
    position: center;
    margin-left: 10vh;
    margin-top: 0.5vh;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 2vh;
    background-color:rgba(255, 255, 255, 0.918);
    padding: 2vh;
    outline: 0;
    border: 1px solid gray;
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
    
} */
.result{
    /* top: 25%;
    left: 50.2%;
    transform: translate(-50%, -50%);
    position: absolute; */
    /* width: 35vw;
    height: 14rem; */
    overflow: hidden;
}
.resultbox{
    /* top: 5%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    margin-left: 15rem;
    justify-content: center;
    /* position: fixed; */
    border: 1px solid rgb(190, 190, 190);
    width: 35vw;
    height: 2.5vw;
    background: rgb(240, 239, 239);
    padding-left: 3vw;
}
.lens{
    height: 1rem;
    width: 1rem;
    /* margin-left: 32vw; */
    margin-left:1rem;
    z-index: 10;
    position: absolute;
}

.overlay{
    background: black;
    /* position: absolute; */
    height: 100%;
    width: 100%;
    /* filter: opacity(60%); */
}
@media (min-width: 768px){
    .lens{
        height: 2vw;
        width: 2vw;
        /* margin-left: 32vw; */
        z-index: 10;
        position: absolute;
    }
    .background{
        /* background-image: url('../../public/hal-gatewood-tZc3vjPCk-Q-unsplash.jpg'); */
        background-image: url('../../public/mathew-schwartz-IDo8PVvKYsY-unsplash.jpg');
        /* top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute; */
        /* display: flex;
        justify-content: center; */
        text-align: center;
        background-size: 100%;
        background-repeat: no-repeat;
        background-origin:border-box;
        background-blend-mode: overlay;
        /* filter: opacity(40%); */
        /* position: relative; */
    }
    .mention-link{
        font-family: "Source Code Pro", sans-serif;
        color: gray;
        display: flex;
        flex-direction: row;
        padding-bottom: 0;
        /* border: 1px solid rgb(230, 228, 228); */
        border-radius: 0.25rem;
        width: 50vw;
        

    }
    .mention-link.ind:hover{
        background-color:rgb(247, 242, 242);
    

    }
    div.mention-link{
        border: none;
        background-color:rgb(255, 255, 255);
        border-radius: 0.2rem;
        z-index: 10;
        /* overflow-y:scroll; */
    

    }
   
    #profile-img{
        height: 2rem;
        width: 2rem;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 0.2rem;
        margin-right: 2vh;
    }
        
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
