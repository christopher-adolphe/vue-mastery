import RandomNumber from '@/components/RandomNumber';
import { mount } from '@vue/test-utils';

describe('#RandomNumber', () => {
  it('should initialize the #randomNumber data property to 0', () => {
    const wrapper = mount(RandomNumber);

    // Using the `html()` to access the component's template elements
    const template = wrapper.html();

    expect(template).toContain('<span>0</span>');
  });

  it('should set #randomNumber data property to a value between 1 and 10', async () => {
    const wrapper = mount(RandomNumber);

    // Using the `find()` method to access elements from the component's
    // template and triggering a click event
    await wrapper.find('button').trigger('click');

    // Accessing the text content of the span element
    const randomNumber = parseInt(wrapper.find('span').text());

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(10);
  });

  it('should set #randomNumber data property to a value between 200 and 300', async () => {
    // Passing a second argument to the `mount()` method to set
    // values of the component's `props` object
    const wrapper = mount(RandomNumber, {
      props: {
        min: 200,
        max: 300
      }
    });

    // Using the `find()` method to access elements from the component's
    // template and triggering a click event
    await wrapper.find('button').trigger('click');

    // Accessing the text content of the span element
    const randomNumber = parseInt(wrapper.find('span').text());

    expect(randomNumber).toBeGreaterThanOrEqual(200);
    expect(randomNumber).toBeLessThanOrEqual(300);
  });
});
