import "./bootstrap";
import "../css/styles.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import router from "./router";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.use(plugin);
        app.use(router);
        app.mount(el);
    },
});
