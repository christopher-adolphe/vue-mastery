<template>
  <div>
    <h1>Create an event</h1>

    <div class="form-container">
      <form @submit.prevent="onSubmit">
        <label>Select a category: </label>
        <select v-model="event.category">
          <option
            v-for="option in categories"
            :value="option"
            :key="option"
            :selected="option === event.category"
          >{{ option }}</option>
        </select>

        <h3>Name & describe your event</h3>

        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Title"
        />

        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Description"
        />

        <h3>Where is your event?</h3>

        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Location"
        />

        <h3>When is your event?</h3>
        <label>Date</label>
        <input
          v-model="event.date"
          type="text"
          placeholder="Date"
        />

        <label>Time</label>
        <input
          v-model="event.time"
          type="text"
          placeholder="Time"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
// import EventService from '@/services/EventService';

export default {
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // Access the `user` state from the Vuex store and assigning
      // its value to the `this.event.organizer`
      const event = { ...this.event, id: uuid(), organizer: this.$store.state.user };

      // Using the `createEvent` action to commit the `ADD_EVENT` mutation
      await this.$store.dispatch('createEvent', event);

      // Navigating to the EventList page
      this.$router.push({ name: 'EventList' });
      
      // try {
      //   // Posting the new event
      //   await EventService.postEvent(event);

      //   // Committing the new even to the Vuex state
      //   this.$store.commit('ADD_EVENT', event);

      //   // Navigating to the EventList page
      //   this.$router.push({ name: 'EventList' });
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }
}
</script>
