app.component('review-form', {
  template:
  /*html*/
  `<!-- Binding to the "submit" event with a modifier to prevent -->
  <!-- the default submit event to be triggered and instead trigger our own "onSubmit()" method -->
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <!-- Binding to the "v-model" directive to create two-way data binding -->
    <!-- between the input element and the "name" data property -->
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <!-- Binding to the "v-model.number" directive which a modifier to typecast the -->
    <!-- value to a number -->
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input class="button" type="submit" value="Submit">
  </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null
    }
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.review === '' || this.rating === null) {
        alert('Please fill review form completely!!');

        return;
      }
      const review = {
        name: this.name,
        review: this.review,
        rating: this.rating
      };

      this.$emit('review-submitted', review);

      this.name = '';
      this.review = '';
      this.rating = null;
    }
  }
});
