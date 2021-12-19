app.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template:
  /*html*/
  `<ul>
    <!-- Using the "v-for" directive to iterate over the "details" data property -->
    <!-- which a collection of strings and render a list of DOM elements -->
    <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
  </ul>`
});
