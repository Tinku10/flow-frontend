<template>
    <div>
        <nav class="h-30 w-full p-2 navbar-color mb-6 md:mb-0 " >
        <router-link  to="/" style="text-decoration: none"><span  id="image" class="bg-no-repeat p-3 lg:p-4  lg:mr-4 lg:ml-4 mr-4 md:mr-4 md:ml-4"></span></router-link>
        <!-- <span class="search-img ml-8 p-3 z-10 absolute mt-1"></span> -->
        <!-- <span class="flex items-center"> -->
            <!-- <img class="lens md:ml-1" src="../../public/search.svg" alt=""> -->
            <input type="search" name="" class="h-8 w-56 lg:ml-6 lg:mr-4 p-3 outline-none border-none md:w-64 rounded-sm" placeholder="Search" @blur="searchbox=false" @focus="searchbox = true" v-model="search">
        <!-- </span> -->
        <span class="float-right" v-if="isAuth">
            <ApolloQuery :query="require('../graphql/queries/profilePhoto.graphql')"  >
                <template v-slot="{result: {data}, isLoading} ">
                    <div  v-if="!isLoading " class=" md:mr-4  p-1 border-none outline-none cursor-pointer" @focus="menuPressed=true" @blur="menuPressed=false" tabindex="0">
                        <img class="rounded-sm h-6 w-6" :src="getImage(data)">
                    </div>
                    <div class="h-6 w-6 rounded-sm bg-gray-100 mr-4 lg:ml-1 float-right p-2 mt-1 cursor-pointer" v-else></div>
                </template>

            </ApolloQuery>
        </span>
        <!-- <span>
            <button  class="p-1 mr-4 ml-4 text-gray-100 float-right outline-none border-none" v-on:click="logout">Log out</button>
        </span> -->
    </nav>
    <transition name="fade">
        <div v-show="menuPressed" class="h-24 w-32 md:mt-1 rounded shadow-md absolute mr-4 z-50 bg-white right-0 outline-none border-none">
            <div  class="p-3 mr-4 ml-6 text-gray-100 outline-none border-none text-gray-700 align-middle cursor-pointer" v-on:click="logout">Log out</div>
            <router-link :to="{path: '/profiles/'+String(this.id)}" class="p-3 mr-4 ml-6 text-gray-100 outline-none border-none text-gray-700 align-middle" style="text-decoration: none">Profile
            </router-link>
        </div>
    </transition>
    <transition name="slide-fade">
        <div class="mention-link w-screen md:w-64 md:h-56 absolute border-gray-200 md:shadow-md p-2 lg:ml-24 md:mt-1 top-5  h-64 rounded-sm transition-shadow md:ml-16 "  v-show="searchbox" >
            <ApolloQuery 
            :query="require('../graphql/queries/users.graphql') "
            >
                <template  v-slot="{result: {data}}">
                    <span v-if="data">
                        <ul >
                            <li v-for="user in filteredUsers(data.users)"  v-bind:key="user.id"  >
                                <router-link :to="{path: '/profiles/'+String(user.id)}" class="mention-link ind mt-2 mb-2 md:w-56 border-gray-100 md:ml-1 md:mr-1 w-screen overflow-x-hidden" style="text-decoration: none">
                                    <img id="profile-img" :src="getProfiles(user.username)">
                                    <p class="items-center">{{user.name}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </span>
                <!-- <p v-else>Loading..</p> -->
                </template>
            </ApolloQuery>
        
        </div>
    </transition>
    
    </div>
</template>

<script>
import {onLogout} from '../vue-apollo';

export default {
    data(){
        return{
            searchbox: false,
            search: null,
            users: [],
            menuPressed: false,
            id: null,
        }
    },
    methods: {
        getImage(data){
            this.id = data.me.id;
            // this.$store.state.photo = 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
            return 'https://api.adorable.io/avatars/184/' + data.me.username + '@adorable.io.png';
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
        logout(){
            onLogout(this.$apollo.provider.defaultClient);
            this.$router.push({path: '/'});
        },
        getProfiles(data){
             return 'https://api.adorable.io/avatars/184/' + data + '@adorable.io.png';
        },
        isAuth(){
            if(localStorage.getItem("apollo-token")){
                return true;
            }
            return false;
        },
    }
}
</script>

<style scoped>
#image{
    background: url('../../public/atom.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    /* filter: grayscale(100%) */

}
.mention-link{
    font-family: "Source Code Pro", sans-serif;
    color: gray;
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
    /* border: 1px solid rgb(230, 228, 228); */
    border-radius: 0.25rem;
    padding-right: 1rem;

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
    /* margin-top: 1.5vh; */
}
.navbar-color{
    background-color: rgb(49, 49, 49);
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
@media (min-width: 768px){
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
    #profile-img{
        height: 6vh;
        width: 6vh;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 0.2rem;
        margin-right: 2vh;
    }
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
#profile-img{
    height: 2rem;
    width: 2rem;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.2rem;
    margin-right: 1rem;
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
.lens{
    height: 1rem;
    width: 1rem;
    /* margin-left: 32vw; */
    margin-left:1rem;
    z-index: 10;
    position: absolute;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>