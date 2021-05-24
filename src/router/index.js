import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

export const adminRoute = {
  path: "/account/user",
  name: "accountUser",
  meta: {
    title: '用户管理',
  },
  component: () => import("@/views/account/User.vue"),
};
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: '',
        component: ()=> import("@/views/OverView.vue"),
        meta: {
          title: '概览'
        }
      },
      {
        path: 'post/list',
        component: ()=> import("@/views/Post/List/List.vue"),
        meta: {
          title: '文章',
        },
      },
      {
        path: 'post/list/detail',
        component: ()=> import('@/views/Post/List/Detail.vue'),
      },
      {
        path: 'post/analysis',
        component: ()=> import("@/views/Post/Analysis.vue"),
        meta: {
          title: '数据分析'
        }
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const noLoginWhiteList = [
  '/login',
];
router.beforeEach(async (to, from) => {
  if(!noLoginWhiteList.includes(to.path)) {
    if (!store.state.userInfo) {
      const userInfo = await store.dispatch("getUser");
      if (userInfo.isAdmin) {
        const route = router.resolve(to);
        const hasCurRoute = router.hasRoute(route.name);
        router.addRoute("Home", adminRoute);
        if (!hasCurRoute) return to;
      } else {
        const hasAdminRoute = router.hasRoute(adminRoute.name);
        if(hasAdminRoute) {
          router.removeRoute(adminRoute.name);
        }
      }
    }
  }
});

export default router;
