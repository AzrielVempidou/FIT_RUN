import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import TableActivities from '../views/TableActivities.vue';
import EditActivitiesView from '../views/EditActivitiesView.vue'
import FormAddActivies from '../views/FormAddActivities.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/Activties',
      name: 'TableActivties',
      component: TableActivities
    },
    {
      path: '/Activties/:id',
      name: 'EditActivties',
      component: EditActivitiesView
    },
    {
      path: '/AddActivies',
      name: 'FormAddActivies',
      component: FormAddActivies
    }
  ]
})

router.beforeEach((to,from,next) => {
  if (localStorage.access_token && to.path === '/login') {
      next('/')
    }else{
      next()
    }
  })

export default router
