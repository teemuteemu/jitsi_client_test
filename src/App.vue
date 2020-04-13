<template>
  <div id="app">
    <Jitsi />
  </div>
</template>

<script>
import Jitsi from './components/Jitsi.vue'

export default {
  name: 'App',
  components: {
    Jitsi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
