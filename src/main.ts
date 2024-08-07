import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia';
import './styles.css';
import 'v-calendar/style.css';
import App from './App.vue';
import router from './router/router';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import 'leaflet-spin/leaflet.spin'

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
pinia.use(createPersistedState())
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

