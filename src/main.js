import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"; 
import VWave from 'v-wave';

import './index.css'
import "./style/css/custom.css";

const app = createApp(App);

app.use(router);
app.use(VWave)
app.mount('#app');