import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "Home", path: "/", component: () => import("./views/Home.vue") },
  { name: "Sign-up", path: "/sign-up", component: () => import("./views/Sign-up.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
