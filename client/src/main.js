import "./index.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import Admin from "./components/Admin/Admin.vue";
import Search from "./components/Search/Search.vue";
import Dictionary from "./components/Dictionary/Dictionary.vue";
import mitt from "mitt";

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
