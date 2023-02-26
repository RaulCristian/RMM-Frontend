<template>

  <Header />
  <Sidebar />

  <div class="spinner-page">
    <Spinner v-if="isLoading"/>

  </div>
    <div class="container">
      <ul class="table">
        <div class="title-container">
          <h1>This is Company Page</h1>
          <div class="add-company-container">
            <Button class="add-btn" @click="createCompany()" />
            <div class="btn-tooltip">Add</div>
          </div>
        </div>
        
        <li class="table-header">
          <div class="col col-1">Company Id</div>
          <div class="col col-2">Company Name</div>
        </li>
  
        <div class="table-row">
          <Companies 
          @update-company="updateCompany"
          @delete-company="deleteCompany" 
          :companies="companies" 
          />
        </div>
      </ul>
    </div>
</template>



<script>
import Companies from '@/components/Companies.vue';
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default { 
  name: "CompanyView",
  components: {
    Companies,
    Button,
    Spinner,
    Header,
    Sidebar
},
  data() {
    return {
      companies: [],
      url: "https://rmmappweb-rvoinea.azurewebsites.net/api/Companies",
      token: "Bearer " + localStorage.getItem("token"),
      isLoading: true,
    }
  },

  methods: {
    createCompany(){
      this.$swal({
      title: 'Add New Company',
      html:
        '<input placeholder="Company Name" id="swal-input1" class="swal2-input">',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add New Company',
      }).then((result) => {
        if (result.isConfirmed) {
          const newName = document.getElementById('swal-input1').value;
          if (newName === '') {
            this.$swal({
              title: 'Oops...',
              icon: 'error',
              text: 'Please enter a valid name for the new company',
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

            const newCompany = {};
            newCompany.name = newName;

            fetch(this.url, {
              method: 'POST',
              headers: { 
              'Content-Type': 'application/json',
              'Authorization': this.token,
              },
              body: JSON.stringify(newCompany)
            }).then(async(response) => {
              let data = await response.text();
              const listCompany = JSON.parse(data);
              console.log(listCompany);

              this.companies = this.companies.concat(listCompany);
              this.companies = this.companies.sort((a, b) => a.id > b.id ? 1 : -1);
            })
          }
        }
      })
    },

    updateCompany(id, name){
      this.$swal({
      title: 'Update Company',
      text: 'Current Name: ' + name,
      input: 'text',
      inputPlaceholder: 'New Company Name',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update Company Name',
      }).then((result) => {
        if (result.isConfirmed) {
          const newName = result.value;
          if (newName === '') {
            this.$swal({
              title: 'Oops...',
              icon: 'error',
              text: 'Please enter a valid name for company',
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

            const newCompany = {};
            newCompany.name = newName;

            fetch(this.url + '/' + id, {
              method: 'PUT',
              headers: { 
              'Content-Type': 'application/json',
              'Authorization': this.token,
              },
              body: JSON.stringify(newCompany)
            }).then(async(response) => {
              let data = await response.text();
              console.log(data);
            })

            const listCompany = {};
            listCompany.id = id;
            listCompany.name = newName;
            this.companies = this.companies.filter(company => company.id != id);
            this.companies = this.companies.concat(listCompany);
            this.companies = this.companies.sort((a, b) => a.id > b.id ? 1 : -1);
          }
        }
      })
    },

    deleteCompany(id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You won`t be able to revert this!',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Yes, delete this company',
        denyButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: 'Deleted!',
            text: 'Company has been deleted with succes.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          fetch(this.url + '/' + id, {
            method: 'DELETE',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': this.token,
            }
          }) 
          this.companies = this.companies.filter(company => company.id != id);
        }
      });
    },

    async getCompanies() {
      const response = await fetch(this.url, {
        headers: {
          'Authorization': this.token,
        }
      })
      const data = await response.json();
      return data;
    },

  },
  async created() {
    this.companies = await this.getCompanies();
    this.isLoading = false;
  }
}

</script>


<style scoped>
  
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

  .add-company-container {
    margin-left: 20px;
    margin-right: 50px;
    margin-bottom: 25px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .add-company-container .btn-tooltip {
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
  
  .add-company-container:hover .btn-tooltip{
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
