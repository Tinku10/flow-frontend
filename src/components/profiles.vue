<template>
  <div class="hello">
    <ApolloQuery :query="require('../graphql/queries/users.graphql') " >
        <template v-slot="{result: {loading, data}}">
          <ul v-for="user in data.users" v-bind:key="user">
            <p >{{user.username}} {{user.name}} {{user.profile}}</p>

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

</style>
