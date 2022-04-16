<template>
  <div class="w-screen">
    <div
      id="blur"
      class="absolute top-0 w-full bg-slate-100 opacity-60 h-4/5"
    ></div>
    <div
      id="unblur"
      class="absolute grid w-full gap-12 px-4 mt-32 md:place-items-center md:mt-30"
    >
      <span class="flex flex-col items-center gap-2 justify-centerst">
        <h2 class="text-2xl font-semibold text-indigo-800">Word of the day</h2>
        <p class="text-base font-medium text-center text-gray-400">
          Build your vocabulary with new words and definitions every day of the
          week
        </p>
      </span>
      <Search_card v-if="isSearching" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import Search_card from "./Search_card.vue";

//reactive states for nested components
let isSearching = ref(true);
let dynamicClass = "";

//emitter is initialized.
const emitter = inject("emitter");
//emitter is received.
emitter.on("hide-card", (payload) => {
  isSearching.value = payload;
});
emitter.on("show-card", (payload) => {
  //Only if there exits a result, if empty dont show.
  isSearching.value = payload;
});
</script>

<style lang="scss" scoped></style>
