import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';

// Using the `reactive()` method from vue to
// create a reactive object that will be shared
// across all components of the application
const globalStore = reactive({
  flashMessage: ''
});

createApp(App)
  .use(store)
  .use(router)
  // Using the `provide()` method to inject the reactive `globalStore` object in all components
  .provide('globalStore', globalStore)
  .mount('#app');
