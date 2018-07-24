import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Albums from './views/Albums.vue';
import Songs from './views/Songs.vue';
import Explore from './views/Explore.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/albums',
      name: 'albums',
      component: Albums
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/albums' || to.path === '/songs') {
    store.state.player.authorized ? next() : next('/');
  } else {
    next();
  }
});

export default router;
