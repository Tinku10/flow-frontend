<template>
  <div >
    <nav><a href="/" style="text-decoration: none"><strong>Code</strong>Book</a></nav>
    <div id="first">
        <h1 class="main ">Log In</h1>
        <form action="" method="POST" class="containers">
            <input class="input" type="text" placeholder="Username" required  name="username">
            <input class="input" type="password" placeholder="Password" required name="password">

            <input id="submit" type="submit" value="LOG IN">
        </form>
        <!-- <form action="post" class="containers">
            <input class="input"
                placeholder="Username"
                :error-messages="usernameErrors"
            >
                
            
            <input class="input"
                placeholder="Password"
                :error-messages="passwordErrors"
            >
            <input id="submit" type="submit" value="LOG IN">
            
        </form> -->
        <div class="message">
            <h4 id="bottom">Not registered yet?</h4>
            <h4 id="bottom"><a href="/register" style="text-decoration: none; color: rgb(113, 212, 212)">Sign up</a></h4>
        </div> 
    </div>

  </div>
</template>

<script>
// import {required} from 'vuelidate/lib/validators';
export default {
    // validations: {
    //     Username: {required},
    //     Password: {required}
    // }, 
    // methods: {
    //     usernameErrors(){
    //         const errors = [];
    //         !this.$v.username.required && errors.push('Username is required');
    //         return this.errors;
    //     },
    //     usernamePasswordErrors(){
    //         const errors = [];
    //         !this.$v.username.required && errors.push('Username is required');
    //         return this.errors;
    //     }
    // }
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
    background-color: rgb(113, 212, 212);

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
</style>

