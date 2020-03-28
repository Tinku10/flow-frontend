<template>
  <div class="hello">
    <ApolloQuery :query="require('../graphql/queries/users.graphql') " :variables="{id: 1}">
        <template v-slot="{result: {loading, data}}">
          <p v-if="data">{{data.user.username}} {{data.user.name}}</p>
          <p v-else>Loading..</p>
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
