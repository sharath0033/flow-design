<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'

export default {
  name: 'app',
  components: {
    Home
    , Edit
  }
}
</script>

<style lang="less">
  body{
    margin: 0px;
    #app {
      font-family: Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
  }
</style>
