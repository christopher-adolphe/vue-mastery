<template>
  <p>Edit the event here.</p>
</template>

<script>
export default {
  name: 'EventEdit',
  props: ['event'],
  data() {
    return {
      areChangesSaved: true
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.areChangesSaved) {
      const answer = window.confirm('You have unsaved changes! Are you sure you want to leave?');

      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>
