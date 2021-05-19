import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: "Login",
    component: ()=> import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    name: "Home",
    component: ()=> import('@/views/Home.vue'),
    children: [
      {
        path: '/account/user',
        name: "accountUser",
        component: ()=> import('@/views/account/User.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
