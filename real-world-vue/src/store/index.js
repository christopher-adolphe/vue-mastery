import { createStore, } from 'vuex';
import { reactive } from 'vue';

export default {
  store: createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {}
  }),
  // Using the `reactive()` method from vue to
  // create a reactive object that will be shared
  // across all components of the application
  globalStore: reactive({
    flashMessage: '',
    event: null
  })
};

// export default reactive({
//   flashMessage: '',
//   event: null
// });
