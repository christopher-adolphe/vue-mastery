import { createRouter, createWebHistory } from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventDetails from '@/views/EventDetails';
import About from '@/views/About';

const routes = [
  {
    path: '/',
    name: 'EventList',
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    // Setting the `props` property to true in the route config
    // to indicate Vue Router that we want to send route parameters
    // as props to the Vue component. This creates a loose coupling
    // between Vue Router and the component; meaning inside the
    // component we don't have to rely on `$route.params.id` or
    // `$route.query.id`
    props: true,
    component: EventDetails
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: 'about' */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
