import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "Home",
        path: "/",
        component: () => import("@/ui/views/Home")
    },
    {
        name: "Engine",
        path: "/engine",
        component: () => import("@/ui/views/engine")
    },
    {
        name: "UiDocumentation",
        path: "/documentation/ui",
        component: () => import("@/ui/views/documentation/Documentation.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;