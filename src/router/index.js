import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/top5",
    name: "top5",
    component: () => import("../views/Top5View.vue"),
  },
  {
    path: "/videogames/:id",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
