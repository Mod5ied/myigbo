<template>
  <div
    id="results"
    class="flex flex-col items-center justify-center gap-10 px-8 py-5"
  >
    <DictCard />
    <!-- :class="DictClass",,  use later -->
    <!-- scroll section -->
    <span
      class="flex items-center justify-between gap-12 px-8 md:justify-center w-96 scrollable md:cursor-pointer"
    >
      <h4
        @click="handleSwitch('defi', true)"
        class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
      >
        Definitions
      </h4>
      <h4
        @click="handleSwitch('synonyms', true)"
        class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
      >
        Synonyms
      </h4>
      <h4
        @click="handleSwitch('antonyms', true)"
        class="text-lg font-semibold text-gray-400 transition-all dark:text-slate-400 dark:hover:text-indigo-700 focus:text-indigo-900 hover:duration-300 hover:text-indigo-900"
      >
        Antonyms
      </h4>
    </span>
    <span>
      <dict-card :useRecord="useRecord" />
    </span>
  </div>
</template>

<script setup>
import { defineAsyncComponent, inject } from "vue";
const DictCard = defineAsyncComponent(() =>
  import("../components/Dict_card.vue")
);

const props = defineProps({
  useRecord: {
    type: {},
  },
});

//dynamic variable definitions.
let DictClass = "w-80";
let useRecord = props?.useRecord;

//defines the emitter.
const emitter = inject("emitter");

//fn() emits an event based on the payload given.
function handleSwitch(payload, val) {
  //todo: handleSwitch should also take a value.
  switch (payload) {
    case "defi":
      //emitted events below goes to { dict-card }.
      emitter.emit("alter-defi", val);
      break;
    case "synonyms":
      emitter.emit("alter-synonym", val);
      break;
    case "antonyms":
      emitter.emit("alter-antonyms", val);
      break;
    default:
      break;
  }
}
</script>
