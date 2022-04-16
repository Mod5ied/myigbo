<template>
  <div class="h-screen bg-gray-100 font-body">
    <header
      class="flex flex-row items-center justify-between gap-4 py-3 overflow-x-hidden list-none border border-b-gray-200"
    >
      <Search_box :HideArrow="HideArrow" />
    </header>
    <main class="flex flex-col items-center justify-center gap-10 px-8 py-5">
      <Search_card :class="SearchDynamicClass" />
      <!-- scroll section -->
      <span
        class="flex items-center justify-between gap-12 px-8 transition duration-500 md:justify-center w-96 scrollable"
      >
        <h4
          class="text-lg font-semibold text-gray-400 focus:text-indigo-900 hover:text-indigo-900"
        >
          Definitions
        </h4>
        <h4
          class="text-lg font-semibold text-gray-400 focus:text-indigo-900 hover:text-indigo-900"
        >
          Synonyms
        </h4>
        <h4
          class="text-lg font-semibold text-gray-400 focus:text-indigo-900 hover:text-indigo-900"
        >
          Antonyms
        </h4>
      </span>
      <span>
        <Dict_card />
      </span>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Search_box from "../Search/Search_box.vue";
import Search_card from "../Search/Search_card.vue";
import Dict_card from "./Dict_card.vue";

//dynamic values
let SearchDynamicClass = "w-80";
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
