import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css';
import './assets/css/utils.css';
import FontAwesomeIcon from "./utilities/fontawesome-icons";
import { vfmPlugin } from 'vue-final-modal';
import Maska from 'maska';

createApp(App).component("fa-icon", FontAwesomeIcon).use(vfmPlugin).use(router).use(Maska).mount('#app');
