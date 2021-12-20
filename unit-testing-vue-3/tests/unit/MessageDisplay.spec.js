import MessageDisplay from '@/components/MessageDisplay';
import { mount } from '@vue/test-utils';
import { getMessage } from '@/services/axios';
import flushPromises from 'flush-promises';

// Using the `mock()` method from Jest to mock the `getMessage` module
jest.mock('@/services/axios');

// Using the `beforeEach()` function to clear all mock before each test
// is ran
beforeEach(() => {
  jest.clearAllMocks();
});

describe('#MessageDisplay', () => {
  it('should call #getMessage method and display a message', async () => {
    const mockMessage = 'Hello from the db!';
    // Using the `mockResolveValueOnce()` method to mock a return value
    // from the `getMessage()` function
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);

    await flushPromises();

    expect(getMessage).toHaveBeenCalledTimes(1);

    const message = wrapper.find('[data-testid="message"]').text();

    expect(message).toEqual(mockMessage);
  });

  it('should display an error when #getMessage method fails', async () => {
    const mockError = 'Oops! Something went wrong.';
    // Using the `mockRejectedValueOnce()` method to mock a return failure
    // from the `getMessage()` function
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();

    expect(getMessage).toHaveBeenCalledTimes(1);

    const error = wrapper.find('[data-testid="message-error"]').text();

    expect(error).toEqual(mockError);
  });
});
