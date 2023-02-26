<template>
  <nav>
    <div>
      <img src="../icons/bitdefende.png" alt="" class="sidebar-icon">
    </div>

    <router-link to="/" style="text-decoration: none; color: inherit;">
      <div class="sidebar-link">
        <img src="../icons/overview-icon.png" style="height: 35px; margin-left: 15px; margin-right: 11px">
        <div>
          Overview
        </div>
      </div>
    </router-link>
    
    <router-link to="/companies" style="text-decoration: none; color: inherit;">
      <div class="sidebar-link">
        <img src="../icons/companies-icon.png" style="height: 50px; margin-left: 5px; margin-right: 5px;">
        <div>Companies</div>
      </div>
    </router-link>

    <router-link to="/groups" style="text-decoration: none; color: inherit;">
      <div class="sidebar-link">
        <img src="../icons/groups-icon.png" style="height: 45px; margin-left: 7.5px; margin-right: 7.5px;">
        <div>Groups</div>
      </div>
    </router-link>

    <router-link to="/devices" style="text-decoration: none; color: inherit;">
      <div class="sidebar-link">
        <img src="../icons/device-icon.png" style="">
        <div>Devices</div>
      </div>
    </router-link>

    <div id="accounts-icon" class="sidebar-bottom-link">
      <img src="../icons/people-icon.png">
      <div>
        Manage Accounts
      </div>
    </div>

    <div @click="handleLogout" class="sidebar-link">
      <img src="../icons/logout.png" alt="">
      <div>Logout</div>
    </div>

    <div class="sidebar-link">
      <img src="../icons/settings-icon.png">
      <div>
        Settings
      </div>
    </div>
  </nav>
</template>


<script>

export default {
  name: 'Sidebar',
  methods: {
    async handleLogout () {
      await this.$swal({
        title: 'Logout!',
        text: 'You have logged out with success!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      localStorage.removeItem('token');
      this.$router.push('/login');

    }
  }
}
</script>


<style scoped>
  nav {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: rgb(54, 54, 54);
    color: rgb(236, 5, 5);
    width: 200px;
    z-index: 100;
    padding-top: 5px;
  }
  
  .sidebar-icon {
    width: 80px;
    position: relative;
    top: 20px;
    left: 25%;
    margin-bottom: 30px;
  }
  
  .sidebar-link {
    margin-top: 10px;
    color: white;
    height: 45px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15ms;
  }

  .sidebar-bottom-link {
    margin-top: 180%;
    color: white;
    height: 45px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15ms;
  }
  
  .sidebar-link:hover,
  .sidebar-bottom-link:hover {
    background-color: rgb(200, 0, 0);
  }
  
  .sidebar-link img,
  .sidebar-bottom-link img {
    height: 40px;
    margin-right: 10px;
    margin-left: 10px;
  }

  
  
</style>