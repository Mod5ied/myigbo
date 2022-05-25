<template>
  <!-- defi. -->
  <Transition>
    <div v-if="useDefi" class="flex flex-col gap-5 select-none w-72 md:w-full">
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-white">{{ useRecord.genre }}</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <!-- Here,loop & render with nums being incremented by result num -->
          <!-- See dummy.js for clue -->
          <li>1. {{ useRecord.translation }}</li>
          <!-- Figure out how to filter for words like {man, animals,ets} 
              then apply the red-color and a link/function to those for a search.
        -->
          <li>2. {{}}</li>
        </ul>
      </div>
      <div class="dict-cards" id="verb">
        <p class="text-gray-400 dark:text-white">Adjectives</p>

        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <li>1. {{}}</li>
          <li>1. {{}}</li>
        </ul>
      </div>
    </div>
  </Transition>
  <!-- synonyms. -->
  <Transition>
    <div
      v-if="useSynonyms"
      class="flex flex-col gap-5 select-none w-72 md:w-full"
    >
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-gray-300">Synonyms</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <!-- Here,loop & render with nums being incremented by result num -->
          <!-- See dummy.js for clue -->
          <li class="flex items-center justify-between gap-3">
            1. lorem ipsum
            <span class="text-xs text-red-400">Ozuitem, Bende.</span>
            <!-- maybe make the span a link that takes to a history component that shows the 
              history of the current item and the people that speaks it.
          --></li>
          <li class="flex items-center justify-between gap-3">
            2. lorem ipsum dolor<span class="text-xs text-red-400">
              Ebonyi.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
  <!-- antonyms. -->
  <Transition>
    <div
      v-if="useAntonyms"
      class="flex flex-col gap-5 select-none w-72 md:w-full"
    >
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-white">Antonyms</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <!-- Here,loop & render with nums being incremented by result num -->
          <!-- See dummy.js for clue -->
          <li>1. lorem ipsum dolor sit am</li>
          <li>2. lorem ipsum dolor sit am</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { inject, ref } from "vue";

//define the emitter.
const emitter = inject("emitter");
const props = defineProps({
  useRecord: {
    type: {},
  },
});

//dynamic variables.
let useDefi = ref(null);
let useSynonyms = ref(null);
let useAntonyms = ref(null);
let useRecord = props?.useRecord;

emitter.on("here-input", (pay) => {
  console.log(pay);
});

//emit comes from {dict-results}.
emitter.on("alter-synonym", (payload) => {
  useDefi.value = !payload;
  useAntonyms.value = !payload;
  setTimeout(() => {
    useSynonyms.value = payload;
  }, 800);
});
emitter.on("alter-defi", (payload) => {
  useSynonyms.value = !payload;
  useAntonyms.value = !payload;
  setTimeout(() => {
    useDefi.value = payload;
  }, 800);
});
emitter.on("alter-antonyms", (payload) => {
  useDefi.value = !payload;
  useSynonyms.value = !payload;
  setTimeout(() => {
    useAntonyms.value = payload;
  }, 800);
});
</script>
