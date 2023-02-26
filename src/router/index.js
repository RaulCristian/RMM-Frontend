import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GroupsView from '@/views/GroupsView'
import DevicesView from '@/views/DevicesView'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    requiresAuth: false
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/companies',
    name: 'companies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CompaniesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devices',
    name: 'devices',
    component: DevicesView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && token == null) {
    return '/login';
  }
})


export default router
