<template>
  <div >
    <nav v-if="!off"><router-link to="/" style="text-decoration: none"><strong>Code</strong>Book</router-link></nav>
    <div id="first">
        <h1 class="main " v-if="!off">Update your Profile</h1>
        <ApolloMutation 
        :mutation="require('../graphql/mutations/updateProfile.graphql')" 
        :variables="{description: this.description, website: this.website}"
        @done="onDone"
        >
            <template v-slot="{mutate, errors}">
                <div v-if="!off">
                    <form  class="containers" v-on:submit.prevent="mutate(); off=true">
                        <!-- <div id="imagebox">
                            <img id="imagebox" :src="getImage">
                            
                        </div> -->
                        <br>
                        <input class="input" type="text" placeholder="Description" required  name="description" v-model="description">
                        <input class="input" type="website" placeholder="Website" required name="website" v-model="website">

                        <button id="submit">UPDATE</button>
                        <div v-if="errors">There was an error</div>
                        <!-- <div v-else-if="loading">Loading..</div> -->
                    </form>

                </div>
                <div v-else>
                    <p>Updating..</p>
                </div>
            </template>
        </ApolloMutation>
        <!-- <p>token: {{api_token}}</p> -->
       
        
    </div>

  </div>
</template>

<script>
// import {required} from 'vuelidate/lib/validators';
// import {onLogin} from '../vue-apollo';
export default {
    
    data(){
        return{
            description: "",
            website: "",
            off: false,
            photo: null
            // api_token: ""
        }
    },
    methods: {
        onDone(){
            // console.log(data);
            // this.username = data.user.username;
            this.$router.push({path: '/home'});
        }
        
    },
    computed: {
        // getImage(){
        //     return 'https://api.adorable.io/avatars/184/' + 'null' + '@adorable.io.png';
        // }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    color: rgb(113, 212, 212);
    font-size: 1.8vw;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: lighter;
    margin: 0px;
    padding: 3vw;
    text-align: center;
    align-content: center;
    
    /* border-radius: 0.2rem;
    border: 1px solid rgb(216, 213, 213); */
    
    /* border: 1px rgb(170, 168, 168) solid; 
    border-radius: 0.2rem; */
}

#first{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
}
.containers{
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    

}
p{
    font-size: 2vw;
    font-family: "Source Sans Pro", sans-serif;
    color: rgb(173, 170, 170);
    font-weight: lighter;
    width: 50vw;
    text-align: center;
}
input{
    width: 40vw;
    height: 0.3vw;
    padding: 1.5vw;
    border: 1px solid rgb(184, 182, 182);
    border-radius: 0.2rem;
    margin-bottom: 5px;
    /* box-shadow: 0 20px 30px -16px rgba(66, 66, 66, 0.2); */
    border: none;
    outline: none;

}

textarea{
    width: 50vw;
    height: 4vw;
    border: 1px solid rgb(184, 182, 182);
    font: "Source Sans Pro", sans-serif;
    padding: 1.5vw;
    font-size: 1vw;
    font-weight: lighter;
    color:rgb(164, 165, 165);
    border-radius: 0.2rem;
    margin-bottom: 5px;
    box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);
    border: none;
    outline: none;

}
#submit{
    margin-top: 3vw;
    width: 10vw;
    height: 4vw;
    font-size: 1vw;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    outline: none;
    color: rgb(243, 244, 245);
    margin-bottom: 4vw;
    border-radius: 0.2rem;
    background-color: rgb(113, 212, 212);
    border: none;

}
.input{
    font: "Source Sans Pro", sans-serif;
    font-size: 1vw;
    font-weight: lighter;
    color:rgb(164, 165, 165);
    border: solid 1px rgb(221, 218, 218);
    outline: none;

}
input:hover{
    background-color: rgb(245, 243, 243);
    outline: none;
}
#bottom{
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1.2vw;
    text-align: center;
    text-decoration: none;
    margin-right: 6px;
    margin-left: 6px;
    color: rgb(80, 78, 78);
}
.message{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
nav a{
    /* font-family: 'Playfair Display', serif; */
    font-family: 'La Belle Aurore', cursive;
    color: rgb(113, 212, 212);
    font-weight: lighter;
    padding: 1vw;
    font-size: 1.5vw;
}
.input.image{
    width: 5vw;
    height: 5vw;
    opacity: 0;
    cursor: pointer;

}
#imagebox{
    /* background: url('https://api.adorable.io/avatars/184/12@adorable.io.png'); */
    background-size: contain;
    width: 10vw;
    height: 10vw;
    /* border: 1px dashed rgb(221, 218, 218); */
    outline: none;
    cursor: pointer;
    /* filter: blur(100%); */
}
</style>

