import AppHeader from '@/components/AppHeader';
import { mount } from '@vue/test-utils';

// Using `describe()` Jest function to create a test suite
describe('#AppHeader', () => {
  // Using the `it()` Jest function to create a test
  it('should not show logout button if user is not logged in', () => {
    // Arrange
    // Using the `mount()` function from `vue/test-utils`
    // to mount and wrap the component under test so that
    // we can have access its properties and methods inside
    // the test
    const wrapper = mount(AppHeader);

    // Act
    const isLogoutBtnVisible = wrapper.find('button').isVisible();

    // Assert
    // Using the `expect()` Jest function to create an assertion about
    // the expected outcome of the test
    expect(isLogoutBtnVisible).toBe(false);
  });

  it('should show logout button if user is logged in', async () => {
    // Arrange
    const wrapper = mount(AppHeader);

    // Act
    // Using the `setData()` method to access and set values of properties
    // of the component's data object
    // NOTE: Accessing and setting properties of the component's data object
    // is asynchronous, so we need to make the test asynchronous as well else
    // will fail
    await wrapper.setData({ loggedIn: true });
    const isLogoutBtnVisible = wrapper.find('button').isVisible();

    // Assert
    expect(isLogoutBtnVisible).toBe(true);
  });
});
