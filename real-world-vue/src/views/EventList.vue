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
// import { watchEffect } from 'vue';
// import NProgress from 'nprogress';

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
  // created() {
  //   // Using the `watchEffect()` function to run the `getEvents()` method again
  //   // when a change occurs on reactive objects; in this case the `page` prop
  //   // will change when we click on the Previous or Next link. Therefore, the
  //   // `watchEffect()` function will track these changes and run the `getEvents()`
  //   watchEffect(async () => {
  //     try {
  //     this.events = null;
  //     const response = await EventService.getEvents(2, this.page);

  //     this.events = response.data;
  //     this.totalEvents = response.headers['x-total-count'];
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       // Creating a programmatic navigation in case the component
  //       // fails to get the requested event from the API; i.e 404
  //       this.$router.push({ name: '404Resource', params: { resource: 'event' } });
  //     } else {
  //       // In case we are facing a network error, then navigate programmatically to
  //       // the `NetworkError` component
  //       this.$router.push({ name: 'NetworkError' });
  //     }
  //   }
  //   });
  // },
  // Using the `beforeRouteEnter()` in-component route guard
  beforeRouteEnter(routeTo, routeFrom, next) {
    next(async (comp) => {
      try {
        // NProgress.start();
        comp.events = null;
        const response = await EventService.getEvents(2, comp.page);

        comp.events = response.data;
        comp.totalEvents = response.headers['x-total-count'];
      } catch (error) {
        if (error.response && error.response.status === 404) {
          next({ name: '404Resource', params: { resource: 'event' } });
        } else {
          next({ name: 'NetworkError' });
        }
      } finally {
        // NProgress.done();
      }
    });
  },
  // Using the `beforeRouteUpdate()` in-component route guard
  async beforeRouteUpdate() {
    try {
      // NProgress.start();
      this.events = null;
      const response = await EventService.getEvents(2, this.page);

      this.events = response.data;
      this.totalEvents = response.headers['x-total-count'];
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { name: '404Resource', params: { resource: 'event' } };
      } else {
        return { name: 'NetworkError' };
      }
    } finally {
      // NProgress.done();
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEvents / 2);
    }
  }
};

// 3 In-Component route guards hooks provided by Vue Router
// 1. The `beforeRouteEnter()` method is called before the component is created, with no access to `this`
// beforeRouteEnter(routeTo, routeFrom, next)

// 2. The `beforeRouteUpdate()` method is called when route changes but the component has not. Has access to `this`
// beforeRouteUpdate(routeTo, routeFrom, next)

// 3. The `beforeRouteLeave()` method is called when route is navigated away from. Has access to `this`
// beforeRouteLeave(routeTo, routeFrom, next)

// routeTo - This refers to the route that is about to be navigated to
// routeFrom - This refers to the route that is about to be navigated away from
// next - This is a function that can be called in each of them to resolve the hook, and continue navigation

// Calling `next()` -> continues navigation to the component listed in `routeTo`
// Calling `next(false)` -> cancels the navigation
// Calling `next('/')` -> redirects to the specified path
// Calling `next({ name: 'EventList' })` -> redirects to the named path
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
