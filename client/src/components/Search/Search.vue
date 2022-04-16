<template>
  <div class="h-screen bg-gray-100 overflow-x-hidden font-body">
    <header
      class="flex flex-row justify-between px-3 py-4 list-none border border-b-gray-200"
    >
      <span class="flex text-gray-400">
        <i class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </span>
      <span class="hidden gap-5 font-medium text-gray-400 md:flex" id="menu">
        <li class="search-links">
          <router-link :to="{ name: 'Dictionary' }">Dictionary</router-link>
        </li>
        <li class="search-links">Register</li>
      </span>
    </header>
    <main class="flex flex-col items-center justify-center gap-10 py-10">
      <Search_box :HideArrow="HideArrow" :DynaClass="DynaClass" />
      <!-- <Search_result v-if="hasResult" /> -->
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
import { computed, reactive } from "@vue/reactivity";
import { defineAsyncComponent, inject, ref, watchEffect } from "vue";
import Search_box from "./Search_box.vue";
import Search_buttons from "./Search_buttons.vue";

//async load nested components
const AsyncResults = defineAsyncComponent(() => import("./Search_result.vue"));

//reactive states for all mini components
let search_btns = ref(false);
let search_card = ref(false);
let search_box = ref(false);
let hasResult = ref(false); //if new search 👈 is truthy
let HideArrow = ref(false);

//reactive class states
// let DynaClass = "";

//reactive state for header drpdwn
let menu = ref(false);

//emitter is initialized.
const emitter = inject("emitter");

//emits events
emitter.on("clear-result", (payload) => {
  hasResult.value = payload;
});
emitter.on("show-card", (payload) => {
  hasResult.value = payload;
});
emitter.on("hide-results", (payload) => {
  hasResult.value = payload;
});
</script>
