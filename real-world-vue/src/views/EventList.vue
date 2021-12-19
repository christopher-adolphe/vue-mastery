// Creating a single file component (aka SFC) to encapuslate
// the template, script and styling of a Vue component

// The "template" section defines the component's template
<template>
  <h1>Events for Good</h1>

  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

// The "script" section is a standard JavaScript module.
// It should export a Vue component definition as its default export
<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  async created() {
    try {
      const response = await EventService.getEvents();

      this.events = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

// The "style" section defines CSS associated with the component
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
