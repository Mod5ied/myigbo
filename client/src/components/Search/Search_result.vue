<template>
  <div class="w-screen">
    <div
      id="blur"
      class="absolute top-0 w-full dark:opacity-95 dark:bg-slate-900 bg-slate-100 opacity-90 md:opacity-95 h-4/5"
    ></div>
    <div
      id="unblur"
      class="absolute flex flex-col w-full gap-12 px-4 -mt-60 md:place-items-center md:-mt-60"
    >
      <span class="flex flex-col items-center gap-2 justify-centerst">
        <h2
          class="text-2xl font-semibold text-cyan-600 dark:text-white select-none"
        >
          Word of the day
        </h2>
        <p
          class="text-base font-medium text-center text-gray-500 dark:text-slate-400 md:w-4/5 select-none"
        >
          Build your vocabulary with new words and definitions every day of the
          week
        </p>
      </span>
      <Search_card
        v-if="isSearching"
        :useArray="useArray"
        :userInput="userInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import Search_card from "./Search_card.vue";

//define even-emitter.
const emitter = inject("emitter");

//registers props from {Search}.
const props = defineProps({
  useArray: {
    type: Array,
  },
  userInput: String,
});

//reactive states for nested components.
let dynamicClass = "";
let isSearching = ref(true);
let useArray = props.useArray;
let userInput = props.userInput;

//emitter is received.
emitter.on("hide-card", (payload) => {
  isSearching.value = payload;
});
emitter.on("show-card", (payload) => {
  //Only if there exits a result, if empty dont show.
  isSearching.value = payload;
});
</script>
