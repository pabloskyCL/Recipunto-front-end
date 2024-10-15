import { Router, createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/layaout/layout.vue";
import path from "path";

const routes = [
  {
    path: '/',
    meta: { layout: Layout },
    component: () => import('@/components/Index.vue')
  },
  {
    path: '/recipoints',
    meta: { layout: Layout },
    component: () => import('@/components/Recipoint/Recipoint.vue')
  },
  {
    path: '/recipoint/:recipoint_id',
    meta: { layout: Layout },
    component: () => import('@/components/Recipoint/RecipointDetails.vue')
  },
  {
    path: '/recycle/:recipoint_id?',
    meta: { layout: Layout },
    component: () => import('@/components/recycle/Recycle.vue')
  },
  {
    path: '/myRecycle',
    meta: { layout: Layout },
    component: () => import('@/components/user/myRecycle/MyRecycle.vue')
  },
  {
    path: '/profile',
    meta: { layout: Layout },
    component: () => import('@/components/user/profile/Profile.vue')
  },
  { path: '/register', component: () => import('@/components/user/Register.vue') },
  { path: '/login', component: () => import('@/components/auth/Login.vue') },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;