// import { createStore } from 'vuex'

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// })

import { reactive } from 'vue';

// Using the `reactive()` method from vue to
// create a reactive object that will be shared
// across all components of the application
export default reactive({
  flashMessage: '',
  event: null
});
