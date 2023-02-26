<template>
  
  <main class="main-container">
    <router-view />
  </main>
  
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'App',
  components: { 
    Header,
    Sidebar,
    Spinner,
  },
  
  
}
</script>

<style>
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  body {
    font-family: Roboto, Arial;
    background-color: rgb(248, 248, 248);
    margin: 0;
  }
  
  .main-container {
    display: flex;
    width: 100%;
    
  }
  
  .table {
    width: 100%;
  }
  
</style>
