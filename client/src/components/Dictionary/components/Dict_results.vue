<template>
  <div
    id="results"
    class="flex flex-col items-center justify-center gap-10 px-8 py-5 select-none"
  >
    <!-- scroll section -->
    <span
      class="flex items-center justify-between gap-12 px-8 md:justify-center w-96 scrollable md:cursor-pointer"
    >
      <h4
        @click="handleSwitch('defi', true)"
        :class="useDefi ? 'tabs_active' : 'tabs'"
      >
        Definitions
      </h4>
      <h4
        @click="handleSwitch('synonyms', true)"
        :class="useSynonyms ? 'tabs_active' : 'tabs'"
      >
        Synonyms
      </h4>
      <h4
        @click="handleSwitch('antonyms', true)"
        :class="useAntonyms ? 'tabs_active' : 'tabs'"
      >
        Antonyms
      </h4>
    </span>
    <span>
      <DictCard :useRecord="props.useRecord" />
      <!-- 😄 patrick use kebab-case biko 😄 -->
    </span>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import DictCard from "../components/Dict_card.vue";
// const DictCard = defineAsyncComponent(() =>
//   import("../components/Dict_card.vue")
// );
const emitter = inject("emitter");

const props = defineProps({
  useRecord: {
    type: Object,
    /**  Object or array defaults must be returned from
      a factory function. The function receives the raw
      props received by the component as the argument.
        default(rawProps) {
          return { message: 'hello' }
        } 
    */
  },
});

//dynamic variable definitions.
let useRecord = ref(props.useRecord);
let DictClass = "w-80";
let useDefi = ref(true);
let useSynonyms = ref(false);
let useAntonyms = ref(false);

//fn() emits an event based on the payload given and alters dynamic states.
function handleSwitch(payload, val) {
  //todo: handleSwitch should also take a value.
  switch (payload) {
    case "defi":
      //emitted events below goes to { dict-card }.
      emitter.emit("alter-defi", val);
      useDefi.value = !useDefi.value;
      useAntonyms.value = false;
      useSynonyms.value = false;
      break;
    case "synonyms":
      emitter.emit("alter-synonym", val);
      useSynonyms.value = !useSynonyms.value;
      useDefi.value = false;
      useAntonyms.value = false;
      break;
    case "antonyms":
      emitter.emit("alter-antonyms", val);
      useAntonyms.value = !useAntonyms.value;
      useDefi.value = false;
      useSynonyms.value = false;
      break;
    default:
      break;
  }
}
</script>
