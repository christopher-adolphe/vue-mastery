import { mount } from '@vue/test-utils';
import EventCard from '@/components/EventCard.vue';

describe('EventCard component', () => {
  const mockEvent = {
    id: 'b1220465-e318-4a8f-976d-e125fa608811',
    category: 'sustainability',
    title: 'Beach Cleanup',
    description: 'Help pick up trash along the shore.',
    location: 'Playa Del Carmen',
    date: 'July 22, 2022',
    time: '11:00',
    organizer: 'Carey Wales'
  };

  const wrapper = mount(EventCard, {
    props: {
      event: mockEvent
    }
  });

  it('should successfully render event\'s data', () => {
    const eventTimeDate = wrapper.find('[data-testid="time-date"]').text();
    const eventTitle = wrapper.find('[data-testid="title"]').text();

    expect(eventTimeDate).toMatch(`@${mockEvent.time} on ${mockEvent.date}`);
    expect(eventTitle).toMatch(mockEvent.title);
  });

  it('should binding events data to DOM elements in the template', () => {
    const htmlWrapper = wrapper.html();

    expect(htmlWrapper).toContain(mockEvent.time);
    expect(htmlWrapper).toContain(mockEvent.date);
    expect(htmlWrapper).toContain(mockEvent.title);
  });
});
