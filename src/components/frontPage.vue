<template>
  <div class="hello">
    <nav class="navbar">
        <span><router-link to="/login" id="link">Login</router-link></span>
        <span><router-link to="/register" id="link">Register</router-link></span>
    </nav>
    <div class="center">
        <router-link to="/" style="text-decoration: none"><div class="heading"><strong>Code</strong>Book</div></router-link>
        <p class="description">Share your piece of code with the world</p>
    </div>
    
  </div>
</template>

<script>
// import gql from 'graphql-tag';
export default {
 
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

}
.heading{
    /* font-family: 'Press Start 2P', cursive; */
    font-family: 'La Belle Aurore', cursive;
    /* font-size: 7vw; */
    font-size: 16vh;
    align-content: center;
    color: rgb(113, 212, 212);
    /* font-weight: lighter; */
}
.description{
    /* font-family: "Source Code Pro", sans-serif ; */
    /* font-family: 'Sofia', cursive; */
    font-family: 'Amatic SC', cursive;
    text-align: center;
    font-style: italic;
    color:rgb(128, 125, 125);
    /* font-size: 1.7vw; */
    font-size: 3.5vh;
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
</style>
