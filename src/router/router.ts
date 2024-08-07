import {  Router, createRouter, createWebHistory } from "vue-router";
import LogIn from "@/components/auth/Login.vue";
import Layout from "@/components/layaout/layout.vue";

const routes = [
  { path: '/',
    meta: { layout: Layout },
    component: () => import('@/components/Index.vue')},
  { path: '/recipoints',
    meta: { layout: Layout },
    component: () => import('@/components/Recipoint/Recipoint.vue')
  },
  { path: '/register', component: () => import('@/components/user/Register.vue') },
  { path: '/login', component: LogIn }
];

const router:Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;