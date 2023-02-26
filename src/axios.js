import axios from "axios";


axios.defaults.baseURL = "https://rmmappweb-rvoinea.azurewebsites.net/api/";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');