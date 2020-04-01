<template>
  <div class="hello">
    <ApolloQuery :query="require('../graphql/queries/users.graphql') " >
        <template class="containers" v-slot="{result: {loading, data}}">
          <ul v-for="user in data.users"  v-bind:key="user">
            <div class="user">
              <div  class="image">
                <img src="#">
              </div>
              <div class="info">
                <p class="name">{{user.username}}</p>
                <p class="name">{{user.name}} </p>
                <!-- <p>{{user.profile}}</p> -->
                <div v-if="user.profile">
                  <div v-if="user.profile.description != null">
                    <p class="name" >{{user.profile.description}}</p>
                  </div>
                  <div v-if="user.profile.website != null">
                    <p class="name" >{{user.profile.website}}</p>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <!-- <p v-else>Loading..</p> -->
        </template>
    </ApolloQuery>
    
  </div>
</template>

<script>
// import gql from 'graphql-tag';
export default {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
    /* margin-top: 0px; */
    padding: 50px;
    width: 60vw;
    height: 150px;
    background-color: rgb(247, 242, 242);
    border-radius: 0.2rem;
    border: 1px, solid, rgb(204, 202, 202);
    /* margin-left: 10vw; */
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
}
.image{
    height: 140px;
    width: 140px;
    border-radius: 0.2rem;
    margin-right: 20px;
    color:rgb(119, 116, 116);
    background-color: rgb(206, 205, 205);
}
.name{
    font-size: 20px;
    color:rgb(119, 116, 116);
    font-family: "Source Code Pro", sans-serif;
    font-weight: lighter;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    /* margin-bottom: 2vh; */
}
.containers{
  display:flex;
  flex-wrap: wrap;

}
.info{
  padding: 2vw;
}
</style>
