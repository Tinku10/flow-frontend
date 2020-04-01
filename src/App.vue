<template>
  <div>
    <router-view :key="this.$store.state.change"></router-view>
    <!-- <profiles></profiles> -->
  </div>
</template>

<script>
// import profiles from './components/profiles';

export default {
  name: 'App',

  components: {
    // profiles
  },

  data: () => ({
    //
  }),
};
</script>
