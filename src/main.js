import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://api.tvmaze.com';

createApp(App).use(router).use(store).mount('#app')
