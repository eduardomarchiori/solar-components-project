import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import './assets/css/utils.css'
import FontAwesomeIcon from "./utilities/fontawesome-icons"
import { vfmPlugin } from 'vue-final-modal'

createApp(App).component("fa-icon", FontAwesomeIcon).use(vfmPlugin).use(router).mount('#app')
