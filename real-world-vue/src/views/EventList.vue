// Creating a single file component (aka SFC) to encapuslate
// the template, script and styling of a Vue component

// The "template" section defines the component's template
<template>
  <div>
    <h1>Events for Good</h1>

    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="events__pagination">
        <span>
          <router-link :to="{ name: 'EventList', query: { page: page - 1 } }" rel="Previous" v-if="page !== 1">&#60; Prev</router-link>
        </span>

        <span>{{ page }} of {{ totalPages }}</span>

        <span>
          <router-link :to="{ name: 'EventList', query: { page: page + 1 } }" rel="Next" v-if="page !== totalPages">Next &#62;</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

// The "script" section is a standard JavaScript module.
// It should export a Vue component definition as its default export
<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';
import { watchEffect } from 'vue';

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  // Specifying that this Vue component will receive a prop called `page`
  // The component is actually receiving the `page` prop from the Vue router
  // config as a query parameter
  props: ['page'],
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  // Using the `created()` method lifecylce hook to make the request to the
  // server to get the events via the EventService. This is the right
  // place to initialize data whose value rely on asynchronous sources as
  // the `created()` method is called on the initial load of the Vue component
  created() {
    // Using the `watchEffect()` function to run the `getEvents()` method again
    // when a change occurs on reactive objects; in this case the `page` prop
    // will change when we click on the Previous or Next link. Therefore, the
    // `watchEffect()` function will track these changes and run the `getEvents()`
    watchEffect(async () => {
      try {
      this.events = null;
      const response = await EventService.getEvents(2, this.page);

      this.events = response.data;
      this.totalEvents = response.headers['x-total-count'];
    } catch (error) {
      console.log(error);
    }
    });
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEvents / 2);
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
  width: 100%;
  max-width: 310px;
  margin: 0 auto;
}

.events__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.events__pagination a {
  color: #2c3e50;
  text-decoration: none;
}

.events__pagination span {
  display: inline-block;
  min-width: 48px;
}
</style>
