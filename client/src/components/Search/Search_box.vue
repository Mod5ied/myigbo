<template>
  <div class="relative flex justify-center w-full cursor-pointer">
    <form
      @submit.prevent="handleSubmit"
      class="flex items-center justify-around w-full md:justify-start"
    >
      <i
        v-if="isDictionary"
        class="relative flex items-center justify-center w-8 h-8 transition border-2 rounded-lg md:left-10 hover:border-gray-200 md:hover:border-indigo-300 hover:duration-300"
      >
        <router-link :to="{ name: 'Search' }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </router-link>
      </i>
      <span
        class="relative flex items-center justify-center w-4/5 md:right-5 md:m-auto md:w-2/5"
      >
        <input
          class="input-box"
          v-model="input"
          type="text"
          :placeholder="placeholder"
          :oninput="hideResultComponent"
        />
        <div
          id="input_icons"
          class="absolute flex items-center justify-between gap-5 right-10 sm:right-16 md:right-8"
          :class="dynaClass"
        >
          <i class="flex items-center text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
          <i
            class="flex items-center text-gray-400 hover:text-gray-600"
            v-if="notTyping"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </i>
          <!-- !set to 14, cannot exist with 👆, one must !exist -->
          <i
            class="flex items-center text-gray-400 hover:text-gray-600"
            v-if="isTyping"
            @click="clearInputBox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </div>
      </span>
    </form>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect, watch } from "vue";

//reactive input data.
let input = ref("");
let placeholder = ref("Search by word");
let notTyping = ref(true);
let isTyping = ref(false);
let isDictionary = props.HideArrow;
let dynaClass = props.DynaClass;

//props for renderin component state
const props = defineProps({
  HideArrow: Boolean,
  DynaClass: String,
});

//event bus initialized.
const emitter = inject("emitter");

//methods
function hideCard() {
  emitter.emit("hide-card", false);
}
function clearInputBox() {
  input.value = null;
}

//emits to clear input.
emitter.on("clear-input", () => {
  //comes from {Search}
  input.value = null;
});
emitter.on("revert-btns", (payload) => {
  //comes from {search-btns}
  isTyping.value = payload[0];
  notTyping.value = payload[1];
});

//emitter to trigger hide Search btns.
//input 'fns()'
const handleSubmit = function () {
  emitter.emit("hide-buttons", false);
  emitter.emit("show-card", true); //goes to {search-res & Search}.
};
const hideResultComponent = function () {
  emitter.emit("hide-results", false); //goes to {search-res & Search}.
  isTyping.value = true;
  notTyping.value = false;
};

// watchers -> to alter reactive state.
// watch(isTyping, () => {
//   if (
//     input.value.length < 1
//       ? (notTyping.value = false)
//       : (notTyping.value = true)
//   );
// });
</script>
