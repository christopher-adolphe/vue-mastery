// Using the `component()` method to create child component
// that can then be added to the root component of the Vue
// application. It takes two arguments, the first argument is
// the name of the component which will be used as an html tag
// and the second argument is an object which will contain the
// data properties and methods of this component
app.component('product-display', {
  // The `props` property is an object which contains the custom
  // properties that can be used to pass data from outside into
  // the component. We can set validation on `props` properties
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Number,
      require: true
    }
  },
  // The `template` property contains the html markup, the data 
  // and event bindings of the component
  template:
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" :class="[ inventory === 0 ? 'out-of-stock-img' : '' ]" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p>{{ description }}</p>

        <!-- Using the "v-if" directive to conditionally render a DOM element -->
        <!-- The "v-if" directive removes the element from the DOM when it evaluates to false -->
        <p v-if="inventory > 10 && isInStock">In stock</p>

        <p v-else-if="inventory <= 10 && inventory > 0 && isInStock">Almost sold out</p>

        <p v-else>Out of stock</p>

        <!-- The "v-show" directive applies a "display: none" style to the element  -->
        <!-- when it evaluates to false but the element is not removed from the DOM  -->
        <!-- <p v-show="isInStock">In stock</p> -->

        <!-- Binding the href attribute to the "url" data property with the shorthand binding syntax ":" -->
        <a :href="url" target="_blank">Manufactured by Vue Mastery</a>

        <p v-if="isOnSale">{{ salesText }}</p>

        <p>Shipping: {{ shipping }}</p>

        <h4>Details</h4>

        <product-details :details="details"></product-details>

        <h4>Variants</h4>

        <ul>
          <li v-for="(variant, index) in variants" :key="variant.id" @mouseover="toggleProductColor(index)">
            <div class="color-circle" :style="{ backgroundColor: variant.color }"></div>
          </li>
        </ul>

        <h4>Sizes</h4>

        <ul>
          <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
        </ul>

        <!-- Using the "v-on" directive to bind to the click event on the button -->
        <!-- Here the logic we want to implement on the click event is simple so -->
        <!-- we can assign the expression to the directive. For more complex logics -->
        <!-- we can assign a method defined in the component which will then be -->
        <!-- called everytime the click event is triggered on the button -->
        <!-- <button class="button" v-on:click="cart += 1">Add to Cart</button> -->

        <!-- Binding the click event to the "addToCart" method with the shorthand event binding syntax "@" -->
        <button class="button" @click="addToCart" :class="[inventory === 0 ? 'disabledButton' : '' ]">Add to Cart</button>
        <button class="button" @click="removeFromCart" :class="[cart === 0 ? 'disabledButton' : '' ]">Remove from Cart</button>
      </div>
    </div>

    <review-list :reviews="reviews" v-if="reviews.length"></review-list>

    <review-form @review-submitted="handleReviewSubmitted"></review-form>
  </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      description: 'These cotton-rich socks are just what you need to boost your sock collection. They are made from breathable cotton-rich yarns and have a reinforced heel and toe.',
      selectedVariant: 0,
      url: 'https://www.vuemastery.com/courses/intro-to-vue-3/attribute-binding-vue3',
      inventory: 4,
      isOnSale: true,
      details: ['60% cotton', '30% wool', '10% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
      ],
      sizes: ['small', 'medium', 'large'],
      reviews: []
    };
  },
  methods: {
    addToCart() {
      if (this.inventory === 0) {
        return;
      }

      this.inventory -= 1;

      // Emitting an event when the `addToCart()` method is called so that
      // the parent component can listen to that event and react to it
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.inventory += 1;

      // Emitting an event when the `removeFromCart()` is called so that the
      // the parent component can listen to that event and react to it
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },
    toggleProductColor(index) {
      this.selectedVariant = index;
    },
    handleReviewSubmitted(review) {
      this.reviews.push(review);
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    isInStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    salesText() {
      if (this.isOnSale) {
        return `${this.brand} ${this.product} is on sale!!`;
      }
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }

      return '$2.99'
    }
  }
});
