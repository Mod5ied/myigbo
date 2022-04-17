<template>
  <div class="h-screen bg-gray-100 font-body dark:bg-slate-900">
    <header
      class="flex flex-row justify-between w-full px-3 py-1 list-none border-b dark:border-b-gray-800 md:py1 dark:bg-slate-900 bg-gray-50"
    >
      <Search_box :HideArrow="HideArrow" />
    </header>
    <main class="flex flex-col items-center justify-center gap-10 px-8 py-5">
      <Search_card :class="DictClass" />
      <!-- scroll section -->
      <span
        class="flex items-center justify-between gap-12 px-8 md:justify-center w-96 scrollable md:cursor-pointer"
      >
        <h4
          class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
        >
          Definitions
        </h4>
        <h4
          class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
        >
          Synonyms
        </h4>
        <h4
          class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
        >
          Antonyms
        </h4>
      </span>
      <span>
        <Dict_card />
      </span>
    </main>
    <footer
      class="flex justify-end w-full px-3 md:justify-between md:gap-5 md:px-10 md:fixed md:bottom-3"
    >
      <i class="hidden md:flex md:items-center md:gap-3 md:text-2xl">
        <ion-icon
          name="logo-twitter"
          class="text-2xl text-blue-700 transition hover:text-blue-300 focus:text-blue-300 hover:duration-300"
        ></ion-icon>
        <ion-icon
          name="logo-github"
          class="text-2xl text-gray-700 transition hover:text-gray-500 focus:text-gray-500 hover:duration-300"
        ></ion-icon>
      </i>
      <i
        title="Play a Puzzle"
        class="flex items-center text-red-300 transition-all hover:text-red-500 focus:text-red-700 hover:duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10 md:w-12 md:h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      </i>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Search_box from "../Search/Search_box.vue";
import Search_card from "../Search/Search_card.vue";
import Dict_card from "./Dict_card.vue";

//dynamic values
let DictClass = "w-80";
let HideArrow = ref(true);
</script>

<style scoped>
.scrollable {
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollable::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
