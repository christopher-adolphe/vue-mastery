<template>
  <div>
    <p>Register the event here.</p>
    <button type="button" @click="register">Register Me</button>
  </div>
</template>

<script>
export default {
  name: 'EventRegister',
  props: ['event'],
  methods: {
    register() {
      // Using the `push()` method of Vue Router to navigate
      // programmatically to a new route. The `push()` method
      // takes an object as argument which contains the details
      // about the new route we want to navigate to.
      this.$router.push({ name: 'EventDetails', params: { id: this.event.id } });

      // Other examples of programmatic navigation
      // 1. Path as a string -> this.$router.push('/about'});
      // 2. Path as an object -> this.$router.push({ path: '/about' });
      // 3. Named path -> this.$router.push({ name: 'About' });
      // 4. Dynamic segment -> this.$router.push({ name: 'EventDetails', params: { id: 4 } });
      // 5. Query parameter -> this.$router.push({ name: 'EventList', query: { page: 2 } });

      // Using the `replace()` method of Vue Router to navigate
      // programmatically to a new route and preventing the user
      // to navigate to the previous route using the browser back
      // button
      // this.$router.replace({ name: 'EventDetails', params: { id: this.event.id } });

      // Using the `go()` method of Vue Router to navigate the browser
      // history stack
      // To go forward -> this.$router.go(1);
      // To go backward -> this.$router.go(-1);
    }
  }
};
</script>
