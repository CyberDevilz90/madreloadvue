import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";

import './index.css'

createApp(App).mount('#app')
createApp(App).use(router);