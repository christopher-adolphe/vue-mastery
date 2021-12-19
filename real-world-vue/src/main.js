import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import globalStore from './store';
import store from './store/vuexStore';
import 'nprogress/nprogress.css';

createApp(App)
  .use(router)
  .use(store)
  // Using the `provide()` method to inject the reactive `globalStore` object in all components
  .provide('globalStore', globalStore)
  .mount('#app');
