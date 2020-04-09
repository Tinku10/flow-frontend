<template>
  <div >
    <nav v-if="!off" class="h-30 w-full p-2 navbar-color">
        <router-link  to="/" style="text-decoration: none" >
            <span  id="image" class="bg-no-repeat p-4 mr-4 ml-2"></span>
        </router-link>
    </nav>
    <div id="first">
        <h1 class="main " v-if="!off">Log In</h1>
        <ApolloMutation 
        :mutation="require('../graphql/mutations/login.graphql')" 
        :variables="{email: this.email, password: this.password}"
        @done="onDone"
        >
            <template v-slot="{mutate, errors}">
                <div  v-if="!off">
                    <form  class="containers" v-on:submit.prevent="mutate(); off=true">
                        <input class="input" type="text" placeholder="Email ID" required  name="email" v-model="email">
                        <input class="input" type="password" placeholder="Password" required name="password" v-model="password">

                        <button id="submit">LOG IN</button>
                        <div v-if="errors">There was an error</div>
                    </form>
                </div>
                <div v-else>
                    <p>Logging you in..</p>
                </div>
            </template>
        </ApolloMutation>
        <!-- <p>token: {{api_token}}</p> -->
       
        <div class="message" v-if="!off">
            <h4 id="bottom">Not registered yet?</h4>
            <h4 id="bottom"><router-link to="/register" style="text-decoration: none; color: rgb(113, 212, 212)">Sign up</router-link></h4>
        </div> 
    </div>

  </div>
</template>

<script>
// import {required} from 'vuelidate/lib/validators';
import {onLogin} from '../vue-apollo';
export default {
    
    data(){
        return{
            email: "",
            password: "", 
            off: false
            // api_token: ""
        }
    },
    methods: {
        onDone(val){
            // this.api_token = val.data.login;
            // alert(val.data.login);
            this.$store.state.token = val.data.login;
            onLogin(this.$apollo.provider.defaultClient, this.$store.state.token);
            this.$router.push({path: '/home'});
        }
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    color: rgb(141, 223, 228);
    font-size: 1.5rem;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: lighter;
    margin: 0px;
    padding: 2.5rem;
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
    font-size: 1.5rem;
    font-family: "Source Sans Pro", sans-serif;
    color: rgb(173, 170, 170);
    font-weight: lighter;
    width: 50vw;
    text-align: center;
}
input{
    width: 30rem;
    height: 1rem;
    padding: 1.2rem;
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
    margin-top: 3rem;
    width: 10rem;
    height: 3rem;;
    font-size: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    outline: none;
    color: rgb(243, 244, 245);
    margin-bottom: 4vw;
    border-radius: 0.2rem;
    background-color: rgb(141, 223, 228);
    border: none;

}
#submit:hover{
    margin-top: 3rem;
    width: 10rem;
    height: 3rem;;
    font-size: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    outline: none;
    color: rgb(141, 223, 228);
    margin-bottom: 4vw;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(141, 223, 228);

}
.input{
    font: "Source Sans Pro", sans-serif;
    font-size: 0.8rem;
    /* font-weight: lighter; */
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
    font-size: 1rem;
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
#image{
    background: url('../../public/quote-gray.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    filter: grayscale(100%)

}
</style>

