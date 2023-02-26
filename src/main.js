import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#e03444',
};

createApp(App).use(VueSweetalert2, options).use(router).mount('#app')
