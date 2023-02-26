<template>
  <Header />
  <Sidebar />

  <div class="spinner-page">
    <!-- <Spinner v-if="isLoading"/> -->

  </div>
  <div class="container">
    <ul class="table">
      <div class="title-container">
        <h1>This is Groups Page</h1>
        <div class="add-group-container">
          <Button class="add-btn" @click="createGroup()" />
          <div class="btn-tooltip">Add</div>
        </div>


        <div>
          <div>Select a Company:</div>
            <select id="dropdown" v-model="selectedValue" @change="getCompanyId($event), getGroups(this.companyId), optionSelected = true">
              <option disabled value="">Please select one</option>
              <option :key="company.id" v-for="company in companies" :value="company.id">{{company.name}}</option>
          </select>
        </div>

      </div>

      <div v-if="!optionSelected">
        <h2>
          No Company Selected
        </h2>
      </div>

      <div v-if="!existsGroups & optionSelected">
        <h2>
          There are no groups at this company
        </h2>
      </div>

      <div v-if="existsGroups"> 
        <li class="table-header">
          <div class="col col-1">Group Id</div>
          <div class="col col-2">Group Name</div>
        </li>
  
        <div class="table-row">
          <Groups 
          @update-group="updateGroup"
          @delete-group="deleteGroup" 
          :groups="groups" 
          />
        </div>
      </div>
      
    </ul>
  </div>
</template>

<script>
import Companies from '@/components/Companies.vue';
import Groups from '@/components/Groups.vue';
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';



export default {
    name: "GroupsView",
    components: { 
      Spinner, 
      Header, 
      Sidebar,
      Button,
      Companies,
      Groups,
    },
    data() {
      return {
        companies: [],
        groups: [],
        companyId: 0,
        url: "https://rmmappweb-rvoinea.azurewebsites.net/api/Companies",
        token: "Bearer " + localStorage.getItem("token"),
        isLoading: false,
        existsGroups: false,
        optionSelected: false,
      }
    },

    mounted() {
      this.loadCompanies(); 
    },
    methods: {

      createGroup(){
        this.$swal({
        title: 'Add New Group',
        html:
          '<input placeholder="Group Name" id="swal-input1" class="swal2-input">',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Add New Group',
        }).then((result) => {
          if (result.isConfirmed) {
            const newName = document.getElementById('swal-input1').value;
            if (newName === '') {
              this.$swal({
                title: 'Oops...',
                icon: 'error',
                text: 'Please enter a valid name for the new group',
                showConfirmButton: false,
                timer: 1500,
              })
            } 
            else {
              this.$swal({
                title: 'Created!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              })

              const newGroup = {};
              newGroup.name = newName;

              fetch(this.url + "/" + this.companyId + "/groups", {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json',
                'Authorization': this.token,
                },
                body: JSON.stringify(newGroup)
              }).then(async(response) => {
                let data = await response.text();
                const listGroup = JSON.parse(data);
                console.log(listGroup);

                this.groups = this.groups.concat(listGroup);
                this.groups = this.groups.sort((a, b) => a.id > b.id ? 1 : -1);
              })
            }
          }
        })
      },

    updateGroup(id, name){
      this.$swal({
      title: 'Update Group',
      text: 'Current Name: ' + name,
      input: 'text',
      inputPlaceholder: 'New Group Name',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update Group Name',
      }).then((result) => {
        if (result.isConfirmed) {
          const newName = result.value;
          if (newName === '') {
            this.$swal({
              title: 'Oops...',
              icon: 'error',
              text: 'Please enter a valid name for group',
              showConfirmButton: false,
              timer: 1500,
            })
          } 
          else {
            this.$swal({
              title: 'Updated!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })

            const newGroup = {};
            newGroup.name = newName;

            fetch(this.url + "/" + this.companyId + "/groups/" + id, {
              method: 'PUT',
              headers: { 
              'Content-Type': 'application/json',
              'Authorization': this.token,
              },
              body: JSON.stringify(newGroup)
            }).then(async(response) => {
              let data = await response.text();
              console.log(data);
            })

            const listGroup = {};
            listGroup.id = id;
            listGroup.name = newName;
            this.groups = this.groups.filter(group => group.id != id);
            this.groups = this.groups.concat(listGroup);
            this.groups = this.groups.sort((a, b) => a.id > b.id ? 1 : -1);
          }
        }
      })
    },

    deleteGroup(id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won`t be able to revert this!',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Yes, delete this group',
        denyButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Group has been deleted with succes.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          fetch(this.url + "/" + this.companyId + "/groups/" + id, {
            method: 'DELETE',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': this.token,
            }
          }) 
          this.groups = this.groups.filter(group => group.id != id);
        }
      });
    },

      async getGroups(companyId) {
        const response = await fetch(this.url + "/" + companyId + "/groups", {
          headers: {
            'Authorization': this.token,
          }
        })
        const data = await response.json();
        if (data.length == 0) {
          console.log("No groups")
        }

        if (data.length == 0) {
          this.existsGroups = false;
        } else {
          this.existsGroups = true;
        }

        this.groups = data;
      },

      async loadCompanies() {
        const response = await fetch(this.url, {
          headers: {
            'Authorization': this.token,
          }
        })
        const data = await response.json();
        return data;
      },

      getCompanyId(event) {
        this.companyId = event.target.value;
        console.log(this.companyId);
      },

    },
    async created() {
      this.companies = await this.loadCompanies();
      this.isLoading = false;
  }
}


</script>


<style scoped>

  select {
    margin-top: 10px;
    height: 24px;
  }
.spinner-page {
  padding-top: 55px;
  margin-left: 200px;
}

.container {
  margin-left: 150px;
  max-width: 1000px;
  margin-right: auto;
  padding-right: 10px;
  padding-top: 70px;
}

.table {
  padding: 0; 
  position: relative;
  border-collapse: collapse;
  margin-bottom: -60px;
  width: 1000px;
}

.table-header {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: rgb(54, 54, 54);

  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}


.col {
  font-weight: bold;
  font-size: 14px;
  color: lightgray;
}

.col-1 {
  flex-basis: 10%;
}

.col-2 {
  flex-basis: 80%;
}

.table-row {
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
}

.title-container {
  display: flex;
}

.add-group-container {
  margin-left: 20px;
  margin-right: 50px;
  margin-bottom: 25px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.add-group-container .btn-tooltip {
  background-color: rgb(160, 160, 160);
  color: white;
  width: 100%;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;

  position: absolute;
  bottom: -20px;
  margin-top: 5px;

  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
}

.add-group-container:hover .btn-tooltip{
  opacity: 1;
} 


.add-btn {
  border-radius: 2px;
  background: url(../icons/create-icon.png) no-repeat;
  background-size: 90%;
  background-position: center;
  width: 70px;
  height: 70px;
  background-color: rgb(72, 130, 210);
  transition: background-color 0.15ms;
  cursor: pointer;
}

.add-btn:active {
  background: url(../icons/create-icon.png) no-repeat;
}

.add-btn:hover {
  background-color: rgb(51, 94, 154);
}

</style>
