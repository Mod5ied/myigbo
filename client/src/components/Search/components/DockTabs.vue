<template>
  <Transition>
    <footer v-if="useButtons"
    class="fixed flex flex-row justify-center w-full gap-10 px-5 py-2 bottom-4 md:bottom-2 md:gap-20">
    <!-- Should grab data and search and give its dictionary when btn is clicked -->
    <span class="search-btns" v-if="useDict" title="Dictionary">
      <router-link :to="{ name: 'Dictionary' }">
        <i class="flex items-center text-gray-100">
          <svg class="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
            </path>
          </svg>
        </i>
      </router-link>
    </span>
    <span class="search-btns" v-if="useSearch" @click="emitter.emit('reset-search')" title="Translate Words">
      <span>
        <i class="flex items-center text-gray-100">
          <svg class="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </i>
      </span>
    </span>
    <span class="search-btns" v-if="Props.useGames" @click="emitter.emit('show-games')" title="Practice Here!">
      <span>
        <i class="flex items-center text-gray-100">
          <svg class="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z">
            </path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222">
            </path>
          </svg>
        </i>
      </span>
    </span>
    <span class="search-btns" v-if="Props.useSpeaker" title="Learn to speak">
      <router-link :to="{ name: 'Dictionary' }">
        <i class="flex items-center text-gray-100">
          <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clip-rule="evenodd" />
          </svg>
        </i>
      </router-link>
    </span>
    <span class="search-btns" v-if="Props.useExit" title="Exit" @click="refreshState">
      <a>
        <i class="flex items-center text-gray-100">
          <svg class="h-3 h3 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </i>
      </a>
    </span>
  </footer>
  </Transition>
</template>

<script setup>
import { inject, ref } from "vue";

//reactive button states.
let useDict = ref(true);
let useSearch = ref(true)
let useButtons = ref(true);
const useState = [false, true];

const Props = defineProps({
  useGames: {
    type: Boolean,
    default: false
  },
  useSpeaker: {
    type: Boolean,
    default: false
  },
  useExit: {
    type: Boolean,
    default: false
  }
})

//event bus initialized.
const emitter = inject("emitter");
emitter.on("hide-buttons", (payload) => {
  //comes form {search-box} hides speak & dict.
  useSpeaker.value = payload[0];
  useDict.value = payload[0];
  useExit.value = true;
});
emitter.on("hide-search-button", (payload) => {
  useButtons.value = payload;
});
emitter.on("show-search-button", (payload) => {
  useButtons.value = payload;
});

//refresh 'fn'.
const refreshState = () => {
  useExit.value = false;
  useDict.value = true;
  emitter.emit("clear-input"); //goes across to {Search-box}.
  emitter.emit("clear-result", false); //goes up to {Search}.
  emitter.emit("revert-btns", useState); //goes across to {Search-box} input btns.
};
</script>
