import { createRouter, createWebHistory } from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventLayout from '@/views/event/Layout';
import EventDetails from '@/views/event/Details';
import EventRegister from '@/views/event/Register';
import EventEdit from '@/views/event/Edit';
import About from '@/views/About';
import NotFound from '@/views/NotFound';
import NetworkError from '@/views/NetworkError';

const routes = [
  {
    path: '/',
    name: 'EventList',
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: EventList
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    // Setting the `props` property to true in the route config
    // to indicate Vue Router that we want to send route parameters
    // as props to the Vue component. Meaning we indicate Vue Router
    // to make the dynamic segment of the path; i.e `:id` available as
    // a prop in the `EventLayout` component and its children components
    // This creates a loose coupling between Vue Router and the component;
    // meaning inside the component we don't have to rely on `$route.params.id`
    // or `$route.query.id`
    props: true,
    component: EventLayout,
    // Using the `children` property to configure nested routes for events
    // The `EventLayout` will be the parent component while `EventDetails`,
    // `EventRegister` and `EventEdit` will be the children components
    // NOTE: In the configuration below, we are setting `EventDetails` as
    // the default child component to load when the route matches `/event/:id`
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      },
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // It is also possible to create redirections using the alias property
    // inside the route configuration itself but is not recommended for SEO
    // reasons
    // alias: '/about'
  },
  // Configuring a redirection to the About component
  {
    path: '/about',
    redirect: { name: 'About' }
  },
  // Using the `:catchAll(.*)` to match all routes that don't match an existing route
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    props: true,
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
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
