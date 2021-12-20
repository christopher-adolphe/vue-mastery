import MessageContainer from '@/components/MessageContainer';
import { mount } from '@vue/test-utils';

describe('#MessageContainer', () => {
  it('should wrap the #MessageDisplay component', () => {
    // Passing a second argument to the `mount()` function and
    // passing an object to configure a stub of the child component
    const wrapper = mount(MessageContainer, {
      global: {
        stubs: {
          MessageDisplay: {
            template: '<p data-testid="message">Hello from the db!</p>'
          }
        }
      }
    });
    const message = wrapper.find('[data-testid="message"]').text();

    expect(message).toEqual('Hello from the db!');
  });
});
