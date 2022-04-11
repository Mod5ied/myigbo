import "./index.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import Admin from "./components/Admin/Admin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/power", name: "Admin", component: Admin }],
});
createApp(App).use(router).mount("#app");
