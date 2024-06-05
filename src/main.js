import { createApp } from 'vue';
import App from './App.vue';
import router from "./router"; 
import VWave from 'v-wave';
import { createPinia } from 'pinia'; // Ensure Pinia is imported

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:5000';

import './index.css';
import "./style/css/custom.css";

const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance

app.use(pinia); // Use Pinia before the router
app.use(router);
app.use(VWave);

app.mount('#app');
