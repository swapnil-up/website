import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Pages/HomePageContent.vue";
import ArticlePage from "../Pages/ArticlePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../Pages/AboutPage.vue"),
        },
        {
            path: "/articles",
            name: "articles",
            component: () => import("../Pages/AllArticlesPage.vue"),
        },
        {
            path: "/articles/:filename",
            name: "ArticlePage",
            component: ArticlePage,
        },
        {
            path: "/tags",
            name: "tags",
            component: () => import("../Pages/TagsPage.vue"),
        },
        {
            path: "/now",
            name: "now",
            component: () => import("../Pages/NowPage.vue"),
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../Pages/ContactPage.vue"),
        },
        {
            path: "/:catchAll(.*)",
            name: "404",
            component: () => import("../Pages/NotFound.vue"),
        },
    ],
});

export default router;
