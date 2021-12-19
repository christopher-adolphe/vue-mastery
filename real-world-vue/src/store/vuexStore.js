import { createStore } from 'vuex';
import EventService from '@/services/EventService';

export default createStore({
  state: {
    user: 'John Doe',
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    }
  },
  actions: {
    async createEvent({ commit }, event) {
      try {
        // Posting the new event
        await EventService.postEvent(event);

        // Committing the new even to the Vuex state
        commit('ADD_EVENT', event);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {}
});
