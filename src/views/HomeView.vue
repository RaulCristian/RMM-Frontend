<template>
  <Header />

  <Sidebar />
  
  <div class="spinner-page">
    <Spinner v-show="isLoading"/>

  </div>
  <div class="container">
    <h2 v-if="user">
      Hello, {{ user }}! 
    </h2>
    <h2 v-if="!user">
      You are not logged in!
    </h2>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';

export default {
    name: "HomeView",
    data() {
      return {
        user: null,
        isLoading: true,
      }
    },
    components: { Spinner, Header, Sidebar },
    async created() {
      const response = await axios.get('Users/');
      console.log(response.data);
      this.user = response.data;
      this.isLoading = false;
      // setTimeout(() => this.isLoading = false, 10000)
    },
}
</script>

<style scoped>

  .spinner-page {
    padding-top: 55px;
    margin-left: 200px;
  }

  .container {
    margin-top: 100px;
    margin-left: 100px;
  }

</style>
