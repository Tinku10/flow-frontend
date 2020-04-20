<template>
  <div>
      <!-- <p>{{$route.fullPath}}</p> -->
    <transition name="fade">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
    <!-- <profiles></profiles> -->
    
  </div>
</template>

<script>

export default {
  // name: 'App',

  

  // data: () => ({
  //   //
  // }),
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>