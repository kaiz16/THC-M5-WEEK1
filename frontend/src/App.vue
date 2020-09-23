<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>
// importing our todo component from components folder
import Todo from './components/Todo'

export default {
  name: 'App',
  components: {
    // tell vue that we want to use this component
    Todo
  }
}
</script>

<style>
html, body {
  margin: 0; padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: auto;
  
  background: #37ecba; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 60px auto;
 
}
</style>
