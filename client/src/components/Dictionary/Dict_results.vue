<template>
  <div
    id="results"
    class="flex flex-col items-center justify-center gap-10 px-8 py-5"
  >
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
  </div>
</template>

<script setup>
import Dict_card from "./Dict_card.vue";
import Search_card from "../Search/Search_card.vue";

let DictClass = "w-80";
</script>
