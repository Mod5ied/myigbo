<template>
  <div class="h-screen bg-gray-100 font-body dark:bg-slate-900">
    <header
      class="flex flex-row justify-between w-full px-3 py-1 list-none border-b dark:border-b-gray-800 md:py1 dark:bg-slate-900 bg-gray-50"
    >
      <DictSearch />
    </header>
    <main class="flex flex-col">
      <Transition>
        <div v-if="errorValue" class="dict-error-card">
          <div>
            <h3 class="text-center text-slate-500 dark:text-slate-200">
              {{ errorState }}
            </h3>
          </div>
        </div>
      </Transition>
      <Transition>
        <div v-if="hasResults">
          <DictInteract v-if="useInteract" :dynamicClass="klass" />
          <DictResults v-if="useResults" :useRecord="useRecord" />
        </div>
      </Transition>
      <!-- <ErrorBoundary>
        <Transition>
          :passArray="useArray"  only pass when ure ready 
          <DictResults v-if="useResults" />
        </Transition>
      </ErrorBoundary> -->
    </main>
    <footer
      class="flex justify-end w-full px-3 md:justify-between md:gap-5 md:px-10 md:fixed md:bottom-3"
    >
      <i
        @click="handleView"
        title="Play a Puzzle"
        class="flex items-center text-red-300 transition-all hover:text-red-500 focus:text-red-700 hover:duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 md:w-9 md:h-9"
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
import { Requests } from "../../proxy/Services";
import { ErrorStates } from "../../proxy/ErrorScript";
import DictSearch from "./components/Dict_search.vue";
// import ErrorBoundary from "../../ErrorBoundary.vue";
import {
  defineAsyncComponent,
  inject,
  ref,
  onMounted,
  onErrorCaptured,
} from "vue";
const DictResults = defineAsyncComponent(() =>
  import("./components/Dict_results.vue")
);
const DictInteract = defineAsyncComponent(() =>
  import("../Interactive/Dict_Interact.vue")
);
const emitter = inject("emitter");
const { errorMatcher } = ErrorStates;
const { fetchWords } = Requests;

onMounted(async () => {
  try {
    useArray.value = await fetchWords();
  } catch (err) {
    errorMatcher(503, errorState);
    /* use a special notification handler here instead */
  }
});

//dynamic values.
let klass = "mt-20";
let useArray = ref([]);
let useRecord = ref({});
let hasResults = ref(true);
let useResults = ref(false);
let useInteract = ref(true);
let useError = ref(false);
let errorState = ref("");
let errorValue = ref(null);

//functions to toggle and manipulate states.
const handleView = () => {
  useResults.value = false;
  setTimeout(() => {
    useInteract.value = true;
  }, 800);
};

const matchWord = (input) => {
  const result = useArray.value.find((obj) => obj.name === input);
  if (!result || result === null) {
    useRecord.value = {};
    hasResults.value = false;
    setTimeout(() => {
      errorMatcher(404, errorState);
      errorValue.value = true;
    }, 700);
    return;
  }
  errorValue.value = false;
  useRecord.value = result;
  setTimeout(() => {
    hasResults.value = true;
  }, 700);
};

//emit to listen for user-input event.
emitter.on("user-input", (payload) => {
  matchWord(payload);
});

//emitter message is to actually to hide { Dict-interact }.
emitter.on("hide-interact", (payload) => {
  useInteract.value = payload;
  setTimeout(() => {
    useResults.value = !payload;
  }, 700);
});

//emit to listen for error-events from dict_search component.
emitter.on("enable-use-error", (payload) => {
  errorMatcher(300, errorState);
  errorValue.value = payload;
});
emitter.on("disable-use-error", (payload) => {
  useError.value = payload;
});
emitter.on("submit-error", (payload) => {
  const [code, message] = payload;
  //try and make it possible that errMatcher has a match of that error.
  errorMatcher(code, errorState);
  useInteract.value = false;
  errorValue.value = true;
});

onErrorCaptured((error, component, info) => {
  console.log(
    "An error occurred: \n",
    error,
    "At component:",
    component,
    "What happened:",
    info
  );
});
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
