import { mount } from '@vue/test-utils';
import { createStore } from '@/store';
import router from '@/router';
import EventList from '@/views/EventList.vue';
import { events as mockEvents } from '../../db.json';

// Creating a helper function to mount the component under test
// which can take an options objects as argument that we can later
// use in our test cases when we need to add other configurations
const mountEventList = (config = {}) => {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};

  return mount(EventList, {
    // Using the `global` option object to configure global plugins,
    // globally registered component, providers, directive, stubs, mock
    // Adding the component's dependencies to the test; namely the Vuex
    // store dependency and the Vue router dependency
    global: {
      plugins: [createStore(config.plugins.store), router]
    },
    ...config.mountOptions
  });
};

describe('EventList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountEventList();
  });

  it('should render the EventList component', () => {
    expect(wrapper.exists).toBeTruthy();
  });

  it('should render a title', () => {
    const title = wrapper.find('[data-testid="event-list-title"]');

    expect(title.exists).toBeTruthy();
    expect(title.text()).toContain('Events for Good');
  });

  it('should render a list of events', () => {    
    wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            events: mockEvents
          })
        }
      }
    });
    const events = wrapper.findAll('[data-testid="events"]');

    expect(events).toHaveLength(mockEvents.length);

    events.forEach((event, index) => {
      const eventText = event.text();

      expect(eventText).toContain(mockEvents[index].title);
      expect(eventText).toContain(mockEvents[index].date);
    });
  });
});
