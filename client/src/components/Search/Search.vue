<template>
  <div
    class="h-screen overflow-x-hidden bg-gray-100 dark:bg-slate-900 font-body"
  >
    <header
      class="flex flex-row justify-between w-full px-3 py-5 list-none border-b dark:border-b-gray-800 md:px-5 md:py-4 dark:bg-slate-900 bg-gray-50"
    >
      <span class="flex w-full text-gray-400 md:w-8 md:relative md:left-10">
        <i class="flex justify-between w-full cursor-pointer md:items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 md:hidden"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-orange-400 md:w-20 hover:text-orange-300 dark:text-orange-500 dark:hover:text-orange-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="darkState"
            @click="setDarkMode"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 md:w-20 hover:text-orange-400 dark:text-orange-500 dark:hover:text-orange-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            v-if="lightState"
            @click="setLightMode"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </i>
      </span>
      <span
        class="hidden gap-5 text-sm font-medium text-gray-400 dark:text-slate-400 md:flex"
        id="menu"
      >
        <li class="search-links">
          <router-link :to="{ name: 'Dictionary' }">Dictionary</router-link>
        </li>
        <li class="search-links">
          <router-link :to="{ name: 'Admin' }">Admin</router-link>
        </li>
      </span>
    </header>
    <main
      class="flex flex-col items-center justify-center gap-3 py-10 md:px-5 md:py-6 md:gap-10"
    >
      <div id="parent" class="flex flex-col items-center">
        <Transition>
          <div
            id="intro"
            class="flex flex-col items-center justify-center gap-10"
            v-if="useIntro"
          >
            <img :src="image2" alt="" class="w-1/2" />
            <!-- <img :src="darkState ? images[1] : images[0]" alt="" class="dark:" /> -->
            <!-- ✋ load the interactive component 
                  when user hovers over image/section -->
            <span
              class="flex flex-col items-center justify-center gap-3 flex-cols"
            >
              <h1
                class="flex gap-2 text-xl font-bold text-center text-cyan-600 dark:text-white"
              >
                IGBO-TRANS
                <span class="font-black text-red-400">{{ name }} </span>
              </h1>
              <p
                class="w-4/5 text-sm font-medium text-center text-gray-400 dark:text-slate-400"
              >
                Discover translations, learn new words, synonyms and more in
                Igbo.
              </p>
              <p
                v-if="useTrigger"
                @click="handleInteract"
                class="text-sm font-medium text-center text-red-400 underline transition-all cursor-pointer dark:text-slate-400 hover:text-cyan-600 hover:duration-300"
              >
                Practice here!
              </p>
            </span>
          </div>
        </Transition>
        <!-- Would be async loaded to DOM on hover. -->
        <Transition>
          <SearchInteract v-if="useInteract" />
        </Transition>
      </div>
      <Search_box :HideArrow="HideArrow" :SearchClass="SearchClass" />
      <Search_history v-if="useHistory" />
      <Transition>
        <Search_result
          v-if="hasResult"
          :useArray="useArray"
          :userInput="userInput"
          :fnExec="fnExec"
        />
      </Transition>
    </main>
    <footer>
      <div>
        <Search_buttons />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { defineAsyncComponent, inject, onMounted, ref } from "vue";
import { Requests } from "../../scripts/Services";
import Search_box from "./Search_box.vue";
import Search_result from "./Search_result.vue";
import Search_buttons from "./Search_buttons.vue";
import Search_history from "./Search_history.vue";
// import image1 from "../../assets/home.svg";
import image2 from "../../assets/Solutions_2.png";
//async load nested components
// const SearchResults = defineAsyncComponent(() => import("./Search_result.vue"));
const SearchInteract = defineAsyncComponent(() =>
  import("../Interactive/Search_Interact.vue")
);

//dynamic arrays.
// const images = ref([image1, image2]); //👈 should be used to loop through homepage images.
const array = ["Translate", "Teaches", "Transcends", "Services"];
let name = ref("Services");

//fucntion to randomize home text.
function arrDelay(arr, delegate, delay) {
  let i = 0;
  let interval = setInterval(() => {
    //each loop, call passed in function.
    delegate(arr[i]);
    //increment, & if we're past array, clr interval...
    if (i++ >= arr.length - 1) clearInterval(interval);
  }, delay);
  return interval;
}
//homepage name is altered when comp is mounted.
onMounted(async () => {
  arrDelay(array, (obj) => (name.value = obj), 6000);
  useArray.value = await fetchWords();
});

//import the fetch fucntion from request class.
const { fetchWords } = Requests;

//reactive states for all mini components
let hasResult = ref(false); //👈 if new search is truthy.
let useIntro = ref(true); //👈 to show the intro section.
let useTrigger = ref(true); //👈 to show the { Practice here } section.
let useHistory = ref(true); //👈 to show the history tab.
let useInteract = ref(false); //👈 to show the interact section.
let HideArrow = ref(false); // 👈 to hide the search-box arrow.
let useArray = ref(null); // 👈 to store the array that is fetched on mount.
let userInput = ref(""); //👈 to be sent to search-result > search-card.
let fnExec = ref(null); //👈 to be sent to search-result > search-card.

//dark nd light mode states.
let currentState = ref(null);
let darkState = ref(true);
let lightState = ref(null);

//reactive class states
let SearchClass = "mt-10 md:mt-0";

//reactive state for header drpdwn
let menu = ref(false);

//emitter is initialized.
const emitter = inject("emitter");

//emitter to grab user input.
emitter.on("use-input", (payload) => {
  userInput.value = payload;
});

emitter.on("find-word", () => {
  fnExec.value = "true"; //👈 to be sent to search-result > search-card.
});

//emits events
emitter.on("clear-result", (payload) => {
  //comes from {search-btns}
  hasResult.value = payload;
  useHistory.value = true;
});
emitter.on("show-results", (payload) => {
  hasResult.value = payload;
  useHistory.value = false;
});
emitter.on("hide-results", (payload) => {
  //comes from {search-box}
  hasResult.value = payload;
  useHistory.value = true;
});

//fns() for tweaking light and dark modes.
const setDarkMode = () => {
  //emit a set-dark event to App.vue.
  emitter.emit("set-dark", "dark");
  //hide the moon.
  darkState.value = false;
  lightState.value = true;
};
const setLightMode = () => {
  //emit a set-light event to App.vue.
  emitter.emit("set-light", "light");
  //hide the sun.
  lightState.value = false;
  darkState.value = true;
};

//fn() to switch on the interactive mode.
const handleInteract = () => {
  useTrigger.value = false;
  useIntro.value = false;
  setTimeout(() => {
    useInteract.value = true;
  }, 1000);
};

//fns() to check for state in localStorage
function checkState() {
  const state = localStorage.getItem("state");
}
currentState.value = checkState();
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
