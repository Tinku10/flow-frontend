<template>
  <div id="app">
    <main-page class="landing"></main-page>
  </div>
</template>

<script>
import frontPage from './components/frontPage.vue'

export default {
  name: 'App',
  components: {
    'main-page': frontPage
  }
}
</script>

<style>

</style>
