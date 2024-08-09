import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/ui/views/Home"),
  },
  {
    name: "Engine",
    path: "/engine",
    component: () => import("@/ui/views/engine"),
  },
  {
    name: "UiDocumentation",
    path: "/documentation/ui",
    component: () => import("@/ui/views/documentation/Documentation.vue"),
  },
  {
    name: "Layouts",
    path: "/sandbox/layouts",
    component: () => import("@/ui/views/sandbox/Layouts/Layout.vue"),
  },
  {
    name: "DragCode",
    path: "/sandbox/DragCode",
    component: () => import("@/ui/views/sandbox/DragCode/index.vue"),
  },
  {
    name: "Editor",
    path: "/sandbox/Editor",
    component: () => import("@/ui/views/sandbox/Editor/index.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;