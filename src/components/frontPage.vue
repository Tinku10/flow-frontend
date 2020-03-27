<template>
  <div class="hello">
    <nav class="navbar">
        <span><a href="" id="link">LOGIN</a></span>
        <span><a href="" id="link">REGISTER</a></span>
    </nav>
    <div class="center">
        <a href="" style="text-decoration: none"><div class="heading"><strong>Code</strong>Book</div></a>
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
    font-family: "Source Code Pro", sans-serif;
    font-size: 15px;

}
.heading{
    font-family: 'Playfair Display', serif;
    font-size: 8vw;
    align-content: center;
    color: gray;
    font-weight: lighter;
}
.description{
    font-family: "Source Code Pro", sans-serif ;
    text-align: center;
    font-style: italic;
    color:rgb(128, 125, 125);
    font-size: 1vw;
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
