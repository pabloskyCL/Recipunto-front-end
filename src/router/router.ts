import {  createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import LogIn from "@/components/auth/Login.vue";
import Register from "@/components/user/Register.vue";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/register', component: Register },
  { path: '/login', component: LogIn }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;