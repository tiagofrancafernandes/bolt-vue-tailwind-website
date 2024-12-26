import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import 'virtual:windi.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');