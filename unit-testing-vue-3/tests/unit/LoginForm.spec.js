import LoginForm from '@/components/LoginForm';
import { mount } from '@vue/test-utils';

describe('#LoginForm', () => {
  it('should emit an event with the user data payload', async () => {
    const wrapper = mount(LoginForm);
    const inputElem = wrapper.find('[data-testid="name-input"]');

    await inputElem.setValue('Christopher Adolphe');
    await wrapper.trigger('submit');

    // Using the `emitted()` method to access an array of events
    // emitted by the component
    const formSubmittedCalls = wrapper.emitted('formSubmitted');
    const expectedPayload = { name: 'Christopher Adolphe' };

    expect(formSubmittedCalls).toHaveLength(1);
    expect(formSubmittedCalls[0][0]).toMatchObject(expectedPayload);
  });
});
