import "./index.css";
import mitt from "mitt";
import App from "./App.vue";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

//dynamic routing.
const Admin = () => import("./components/Admin/Admin.vue");
const Search = () => import("./components/Search/Search.vue");
const AddQuiz = () => import("./components/Admin/views/AddQuiz.vue");
const AddWord = () => import("./components/Admin/views/AddWord.vue");
const PeekWords = () => import("./components/Admin/views/PeekWords.vue");
const Dictionary = () => import("./components/Dictionary/Dictionary.vue");
const DeleteWord = () => import("./components/Admin/views/DeleteWord.vue");
const UpdateWord = () => import("./components/Admin/views/UpdateWord.vue");

const emitter = mitt();
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/power", name: "Admin", component: Admin },
    { path: "/search", name: "Search", component: Search },
    { path: "/addWord", name: "AddWord", component: AddWord },
    { path: "/addQuiz", name: "AddQuiz", component: AddQuiz },
    { path: "/peekWords", name: "PeekWords", component: PeekWords },
    { path: "/dictionary", name: "Dictionary", component: Dictionary },
    { path: "/deleteWord", name: "DeleteWord", component: DeleteWord },
    { path: "/updateWord", name: "UpdateWord", component: UpdateWord },
  ],
});

// Vue.config.errorHandler(err, vm, info)

createApp(App).use(router).provide("emitter", emitter).mount("#app");
