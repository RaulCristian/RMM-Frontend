<template>
  <form @submit.prevent="handleSubmit">
    <div class="login-container">
      <img class="logo" src="../icons/Bitdefender_Logo_black_text.png" alt="">
      <input type="text" v-model="username" id="username" class="username-bar" placeholder="Username">
      <input type="password" v-model="password" id="password" class="password-bar" placeholder="Password">
      
      <button onclick="" class="login-btn" id="register-btn">
        Create Account
      </button>

    </div>
  </form>
</template>

<script>
import axios from 'axios';


export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async handleSubmit() {
      const data = {
        username: this.username,
        password: this.password
      };

      if (this.username == "" || this.password == "") {
        this.$swal({
            title: 'Warning!',
            text: 'Username/Password is required!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
          })
      }
      else {
        await axios.post("Users/register", data)
        .then(
          response => {
            console.log(response);
            this.$swal({
              title: 'User Created!',
              text: 'User \'' + this.username + '\' has been created successfully.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
            this.$router.push('/login');
          }
        )
        .catch (
          error => {
            this.username = "";
            this.password = "";
            console.log(error);
            this.$swal({
              title: 'Error!',
              text: 'This username is taken by another user',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          }
        )
      }

      
    }
  }

}
</script>

<style scoped>

  form {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .login-container {
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    top: 70px;
  }
  
  .logo {
    margin-top: 100px;
    width: 300px;
    position: relative;
  }
  
  .username-bar {
    margin-top: 20px;
    margin-bottom: -3px;
  }
  
  .username-bar,
  .password-bar {
    font-size: 16px;
    height: 36px;
    width: 240px;
    border-radius: 2px;
    border-style: solid;
    border-width: 2px;
  }
  
  .password-bar {
    margin-bottom: 6px;
  }
  
  
  .login-btn {
    font-size: 16px;
    margin-top: 2px;
    padding: 3px 0;
    width: 240px;
    border-radius: 30px;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(54, 54, 54);
    background-color: rgb(234, 234, 234);
    cursor: pointer;
    transition: background-color 0.15ms;
    
  }
  
  .login-btn:hover {
    background-color: lightgrey;
  }
  
  
  
</style>