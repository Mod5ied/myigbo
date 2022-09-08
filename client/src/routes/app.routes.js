import { createRouter, createWebHistory } from "vue-router";
//dynamic routing.
const Admin = () => import("../components/Admin/Admin.vue");
const Search = () => import("../components/Search/Search.vue");
const Dictionary = () => import("../components/Dictionary/Dictionary.vue");
const ErrorPage = () => import("../components/Interactive/FourOhFour.vue");
const Learn = () => import("../components/Interactive/Learn/learnIgbo.vue");
const Register = () => import("../components/Pages/_dash.vue");
import Loader from "../components/Interactive/Loader.vue";
// const PeekWords = () => import("../components/Admin/views/PeekWords.vue");
// const AddWord = () => import("../components/Admin/views/AddWord.vue");
// const AddQuiz = () => import("../components/Admin/views/AddQuiz.vue");
// const DeleteWord = () => import("../components/Admin/views/DeleteWord.vue");
// const UpdateWord = () => import("../components/Admin/views/UpdateWord.vue");

const routes = [
  { path: "/", name: "Loader", component: Loader },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/learn", name: "Learn", component: Learn },
  { path: "/search", name: "Search", component: Search },
  { path: "/register", name: "Register", component: Register },
  { path: "/dictionary", name: "Dictionary", component: Dictionary },
  { path: "/:catchAll(.*)", name: "NotFound", component: ErrorPage },
  // { path: "/addWord", name: "AddWord", component: AddWord },
  // { path: "/addQuiz", name: "AddQuiz", component: AddQuiz },
  // { path: "/peekWords", name: "PeekWords", component: PeekWords },
  // { path: "/deleteWord", name: "DeleteWord", component: DeleteWord },
  // { path: "/updateWord", name: "UpdateWord", component: UpdateWord },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
