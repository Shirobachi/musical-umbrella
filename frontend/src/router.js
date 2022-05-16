import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ name: "Home", path: "/", component: () => import("./views/Home.vue") },
	{ name: "Home ", path: "/:page", component: () => import("./views/Home.vue") },
  { name: "Sign-up", path: "/sign-up", component: () => import("./views/Sign-up.vue") },
  { name: "Sign-in", path: "/sign-in", component: () => import("./views/Sign-in.vue") },
  { name: "Sign-out", path: "/sign-out", component: () => import("./views/Sign-out.vue") },

  { name: "Office admin list", path: "/offices/:page/:itemsPerPage", component: () => import("./views/offices/list.vue") },
  { name: "Office admin list", path: "/offices/:page", component: () => import("./views/offices/list.vue") },
  { name: "Office new", path: "/offices/new", component: () => import("./views/offices/new.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
