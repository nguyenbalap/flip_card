import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import Card from "../components/play/Card.vue";

const routes = [
  {
    path: "/play/:level",
    name: "play",
    component: Card,
  },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
