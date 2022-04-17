<template>
  <div
    class="h-screen overflow-x-hidden bg-gray-100 dark:bg-slate-900 font-body"
  >
    <header
      class="flex flex-row justify-between w-full px-3 py-5 list-none border-b dark:border-b-gray-800 md:px-5 md:py-4 dark:bg-slate-900 bg-gray-50"
    >
      <span class="flex w-full text-gray-400 md:w-8 md:relative md:left-10">
        <i
          class="flex items-center justify-between w-full cursor-pointer md:w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 md:hidden"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 hover:text-orange-400 dark:text-orange-500 dark:hover:text-orange-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </i>
      </span>
      <span
        class="hidden gap-5 text-sm font-medium text-gray-400 dark:text-slate-400 md:flex"
        id="menu"
      >
        <li class="search-links">
          <router-link :to="{ name: 'Dictionary' }">Dictionary</router-link>
        </li>
        <li class="search-links">Register</li>
      </span>
    </header>
    <main
      class="flex flex-col items-center justify-center gap-3 py-10 md:py-6 md:gap-10"
    >
      <div id="intro" class="flex flex-col items-center justify-center gap-10">
        <img src="../../assets/home.svg" alt="" />
        <!-- ✋ load the interactive component 
        when user hovers over image/section -->
        <span class="flex flex-col items-center justify-center gap-3 flex-cols">
          <h1
            class="text-xl font-bold text-center text-indigo-600 dark:text-white"
          >
            IboTrans Services
          </h1>
          <p
            class="w-4/5 text-sm font-medium text-center text-gray-400 dark:text-slate-400"
          >
            Discover translations, learn new words, synonyms and more
          </p>
        </span>
      </div>
      <Search_box :HideArrow="HideArrow" :SearchClass="SearchClass" />
      <Search_history v-if="useHistory" />
      <async-results v-if="hasResult" />
    </main>
    <footer>
      <div>
        <Search_buttons />
      </div>
    </footer>
  </div>
</template>

<script setup>
// import { computed, reactive } from "@vue/reactivity";
import { defineAsyncComponent, inject, ref, watchEffect } from "vue";
import Search_box from "./Search_box.vue";
import Search_buttons from "./Search_buttons.vue";
import Search_history from "./Search_history.vue";

//async load nested components
const AsyncResults = defineAsyncComponent(() => import("./Search_result.vue"));

//reactive states for all mini components
let search_btns = ref(false);
let search_card = ref(false);
let search_box = ref(false);
let hasResult = ref(false); //if new search 👈 is truthy
let useHistory = ref(true);
let HideArrow = ref(false);

//reactive class states
let SearchClass = "mt-10 md:mt-0";

//reactive state for header drpdwn
let menu = ref(false);

//emitter is initialized.
const emitter = inject("emitter");

//emits events
emitter.on("clear-result", (payload) => {
  //comes from {search-btns}
  hasResult.value = payload;
  useHistory.value = true;
});
emitter.on("show-results", (payload) => {
  hasResult.value = payload;
  useHistory.value = false;
});
emitter.on("hide-results", (payload) => {
  //comes from {search-box}
  hasResult.value = payload;
  useHistory.value = true;
});
</script>
