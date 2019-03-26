<template>
  <div id="app">
    <demo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import demo from './components/demo.vue'

export default {
  name: 'app',
  components: {
    demo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
	width: 100%;
}
html,body{
	background: #F2F6FC;
	height: 100%;
	width: 100%;
	
}
*{
	padding: 0;
	margin: 0;
}
</style>
