import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import './assets/css/utils.css'
import FontAwesomeIcon from "./utilities/fontawesome-icons";

createApp(App).component("fa-icon", FontAwesomeIcon).use(router).mount('#app')
