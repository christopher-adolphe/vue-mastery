app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template:
  /*html*/
  `<div class="review-container">
    <h4>Reviews</h4>

    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        {{ review.name }} gave {{ review.rating }} star(s)
        <br/>
        "{{ review.review }}"
      </li>
    </ul>
  </div>
  `
});
