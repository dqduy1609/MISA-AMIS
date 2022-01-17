<template>
  <div id="app">
      <TheNavbar/>
      <div class="m-main">
      <TheHeader/>
      <TheContent/>
      </div>
  </div>
</template>

<script>

import TheNavbar from './components/layout/TheNavbar.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheContent from './components/layout/TheContent.vue'
export default {
  name: 'App',
  components: {
    TheNavbar,
    TheHeader,
    TheContent
  }
}
</script>

<style>
@import url(./style/main.css);
</style>
