// Using the `createApp()` method to create an instance of a Vue application
// It receives an object as parameter which will contain the options of our
// new Vue application
// NOTE: This will be the root component of the Vue application
const app = Vue.createApp({
  // The `data()` method returns an object which contains the data that
  // a Vue component can display via binding in the html code or use
  // for in its internal logics
  data() {
    return {
      cart: [],
      isPremium: true
    }
  },
  // The `methods` property is an object in every Vue component where
  // we can define methods to perform any logic that the component needs
  // to do
  // NOTE: The methods that are defined inside the `methods` property can
  // have access to the data object returned by the `data()` method of the
  // component via the `this` keyword
  methods: {
    handleAddToCart(id) {
      this.cart.push(id);

      console.log('handleAddToCart - cart: ', this.cart);
    },
    handleRemoveFromCart(id) {
      if (!this.cart.length) {
        return;
      }

      const index = this.cart.indexOf(id);

      if (index === -1) {
        return;
      }

      this.cart.splice(index, 1);
    }
  },
  // The `computed` property is an object in every Vue component where
  // we can define other properties that result from the computation of
  // different properties from the component's data object
  // NOTE: `computed` properties are actually defined as methods that return
  // a value from a logic based on properties of the data object and can
  // be bound in the html template in the same way we would have bound a 
  // property of the data object; e.g {{ title }}
  computed: {}
});
