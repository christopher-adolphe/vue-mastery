<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister', params: { id } }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit', params: { id } }">Edit</router-link>
    </div>
    
    <!-- Using the <router-view /> component provided by Vue Router  -->
    <!-- as an outlet/placholder for the component that should render  -->
    <!-- when the selected nested routes are matched  -->
    <!-- We are also passing the `event` as a prop to the <router-view /> component  -->
    <!-- so that we can make it accessible to the child components  -->
    <router-view :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService';

export default {
  name: 'EventLayout',
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  async created() {
    try {
      const response = await EventService.getEvent(this.id);

      this.event = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped></style>
