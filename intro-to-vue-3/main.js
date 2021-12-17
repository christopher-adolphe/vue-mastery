// Using the `createApp()` method to create an instance of a Vue application
// It receives an object as parameter which will contain the options of our
// new Vue application
const app = Vue.createApp({
  data() {
    return {
      product: 'Socks',
      description: 'These cotton-rich socks are just what you need to boost your sock collection. They are made from breathable cotton-rich yarns and have a reinforced heel and toe.'
    }
  }
});
