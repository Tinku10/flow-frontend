<template>
  <div class="hello">
    <template>
      <ApolloQuery :query="require('../graphql/queries/users.graphql')" :variables="{id: 2}"  >
        <template slot-scope="{result: {data}}">
          <!-- <div v-if="loading">Loading...</div> -->
          <p v-if="data">
            <!-- <li v-for="user in data.users" v-bind:key="user" > -->
              {{user.name}}
              {{user.username}}
              {{user.email}}
              {{user.posts}}
            <!-- </li> -->
          </p>
          <h4 v-else>Loading..</h4>

        </template>

      </ApolloQuery>
    </template>
  </div>
</template>

<script>
// import gql from 'graphql-tag';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      users: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
