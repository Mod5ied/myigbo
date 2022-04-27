import "./index.css";
import mitt from "mitt";
import App from "./App.vue";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

//dynamic routing.
const Admin = () => import("./components/Admin/Admin.vue");
const Search = () => import("./components/Search/Search.vue");
const Dictionary = () => import("./components/Dictionary/Dictionary.vue");

const emitter = mitt();
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/search", name: "Search", component: Search },
    { path: "/dictionary", name: "Dictionary", component: Dictionary },
    { path: "/power", name: "Admin", component: Admin },
  ],
});

createApp(App).use(router).provide("emitter", emitter).mount("#app");
