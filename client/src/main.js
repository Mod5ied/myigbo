import "./app/assets/styles/index.css";
import mitt from "mitt";
import App from "./app/App.vue";
import { createApp } from "vue";
import { router } from "./app/routes/app.routes";
import "vue-loaders/dist/vue-loaders.css"
import VueLoaders from "vue-loaders"
import { createPinia } from "pinia";

const emitter = mitt();

// Vue.config.errorHandler(err, vm, info)

createApp(App).use(router).use(VueLoaders).use(createPinia()).provide("emitter", emitter).mount("#app");
