<template>
  <div
    @hide-buttons="hideButtons()"
    class="fixed flex flex-row justify-center w-full gap-10 px-5 py-2 bottom-4 md:bottom-0 md:gap-20"
  >
    <!-- Should grab data and search and give its dictionary when btn is clicked -->
    <span class="search-btns" v-if="useDict" title="Dictionary">
      <router-link :to="{ name: 'Dictionary' }">
        <i class="flex items-center text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 h3 md:w-4 md:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
            />
            <path
              fill-rule="evenodd"
              d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </router-link>
    </span>
    <span class="search-btns" v-if="useTrans" title="Translator">
      <router-link :to="{ name: 'Dictionary' }">
        <i class="flex items-center text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 h3 md:w-4 md:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </router-link>
    </span>
    <span class="search-btns" v-if="useSpeaker" title="Learn to speak">
      <router-link :to="{ name: 'Dictionary' }">
        <i class="flex items-center text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 h3 md:w-4 md:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </router-link>
    </span>
    <span class="search-btns" v-if="useExit" title="Exit" @click="refreshState">
      <a>
        <i class="flex items-center text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 h3 md:w-4 md:h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </a>
    </span>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";

//reactive button states.
let useDict = ref(true);
let useExit = ref(false);
let useTrans = ref(true);
let useSpeaker = ref(false);
const useState = [false, true];

//event bus initialized.
const emitter = inject("emitter");
emitter.on("hide-buttons", (payload) => {
  //comes form {search-box} hides speak & dict.
  useSpeaker.value = payload[0];
  useDict.value = payload[0];
  useExit.value = true;
});

//refresh 'fn'.
const refreshState = () => {
  useExit.value = false;
  useDict.value = true;
  emitter.emit("clear-input"); //goes to {Search-box}.
  emitter.emit("clear-result", false); //goes to {Search-box} since its more direct.
  emitter.emit("revert-btns", useState); //goes to {Search-box} input btns.
};
</script>
