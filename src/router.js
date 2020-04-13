import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: {
        name: '',
        requiresAuth: false
      },
      component: () => import(`@/views/auth/index`),
      children: [
        {
          name: 'Auth',
          path: '',
          redirect: {
            path: '/login'
          }
        },
        // Login
        {
          name: 'login',
          path: 'login',
          component: () => import('@/views/auth/Login'),
        },
        // Signup
        {
          name: 'signup',
          path: 'signup',
          component: () => import('@/views/auth/Signup'),
        },
      ],
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/Index'),
      meta: {
        name: 'Dashboard View',
        requiresAuth: true,
      },
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

// Route guard checks to see if you are logged in, if not reroutes to login
// to is where you are going, matched.some is to find which routes have requiresAuth
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters.loggedIn
  ) {
    next('/login')
  } else if (
    to.matched.some(record => record.name === 'login') &&
    store.getters.loggedIn
  ) {
    next("/dashboard")
  } else {
    next()
  }
});

export default router
