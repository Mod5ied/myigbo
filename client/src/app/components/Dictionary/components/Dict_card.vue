<template>
  <!-- defi. -->
  <Transition>
    <div v-if="useDefi" class="flex flex-col gap-5 select-none w-72 md:w-full">
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-white">Noun</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <li>1. {{ translations[0].commonTranslate }}</li>
          <li>2. {{ translations[0].primitive[0] }}, {{ translations[0].primitive[1] }}</li>
        </ul>
      </div>
      <div class="dict-cards" id="verb">
        <p class="text-gray-400 dark:text-white">Definitions</p>

        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <li>1. {{ definitions[0] }}</li>
          <li>1. {{ definitions[1] }}</li>
        </ul>
      </div>
    </div>
  </Transition>
  <!-- synonyms. -->
  <Transition>
    <div v-if="useSynonyms" class="flex flex-col gap-5 select-none w-72 md:w-full">
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-gray-300">Synonyms</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <li class="flex items-center justify-between gap-3">
            1. {{ synonyms[0] || "null" }}
            <span class="text-xs text-red-400">{{ "unknown" }}</span>
            <!-- <span class="text-xs text-red-400">{{Ozuitem, Bende.}}</span> -->
            <!-- maybe make the span a link that takes to a history component that shows the 
              history of the current item and the people that speaks it. -->
          </li>
          <li class="flex items-center justify-between gap-3">
            2. {{ synonyms[1] || "null" }}
            <span class="text-xs text-red-400">
              {{ "unknown" || "props with location of word usage (e.g: Ebonyi, Bende)" }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
  <!-- antonyms. -->
  <Transition>
    <div v-if="useAntonyms" class="flex flex-col gap-5 select-none w-72 md:w-full">
      <div class="dict-cards" id="noun">
        <p class="text-gray-400 dark:text-white">Antonyms</p>
        <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
          <li>1. {{ antonyms[0] || "null" }}</li>
          <li>2. {{ antonyms[1] || "null" }}</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { inject, ref } from "vue";

const emitter = inject("emitter");
const props = defineProps({
  useRecord: {
    type: Object,
    default() {
      return { name: "", translation: "", genre: "", definitions: "", antonyms: "", synonyms: "", adjectives: "" };
    },
  },
});

//dynamic vars.
let useDefi = ref(true);
let useSynonyms = ref(null);
let useAntonyms = ref(null);

let word = ref(props.useRecord.name)
let genre = ref(props.useRecord.genre)
let antonyms = ref(props.useRecord.antonyms)
let adjectives = ref(props.useRecord.adjectives);
let definitions = ref(props.useRecord.definitions)
let synonyms = ref(props.useRecord.synonyms)
let translations = ref(props.useRecord.translation)

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
