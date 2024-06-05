import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './styles.css';
import 'v-calendar/style.css';
import App from './App.vue';
import router from './router/router';

const pinia = createPinia();
const app = createApp(App).use(router);
app.use(pinia);
app.mount('#app');

