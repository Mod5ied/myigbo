<template>
  <div
    class="relative flex justify-center w-full cursor-pointer"
    :class="searchClass"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex items-center justify-around w-full md:justify-start"
    >
      <span
        class="relative flex items-center justify-center w-4/5 md:right-5 md:m-auto md:w-2/5"
      >
        <input
          class="input-box"
          v-model.trim="input"
          type="text"
          :placeholder="placeholder"
          @focusin="hideSearchButton"
          @focusout="showSearchButton"
        />
        <!-- 👆 :oninput="hideResultComponent" -->
        <div
          id="input_icons"
          class="absolute flex items-center justify-between gap-5 right-10 sm:right-16 md:right-8"
          :class="dictClass"
        >
          <i
            @click="handleSubmit"
            class="flex items-center text-gray-400 hover:text-gray-600"
            title="Search"
          >
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
            title="History"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </i>
          <i
            class="flex items-center text-gray-400 hover:text-gray-600"
            v-if="isTyping"
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
import { inject, ref, watchEffect } from "vue";

//reactive input data.
let input = ref("");
let placeholder = ref("Search for word");
let notTyping = ref(true);
let isTyping = ref(false);
let searchClass = props.SearchClass;
let dictClass = props.DictClass;
const useState = [false, true];
const emitter = inject("emitter");

// watchers -> to alter reactive state.
watchEffect(() => {
  input.value = input.value.toLowerCase();
});

//props for rendering component state.
const props = defineProps({
  HideArrow: Boolean,
  SearchClass: String,
  DictClass: String,
});


function hideCard() {
  emitter.emit("hide-card", useState);
}
function clearInputBox() {
  input.value = ""; // clears the input box.
}

emitter.on("clear-input", () => {
  //comes from {Search}
  clearInputBox();
});
emitter.on("revert-btns", (payload) => {
  //comes from {search-btns}
  isTyping.value = payload[0];
  notTyping.value = payload[1];
});

//input 'fns()', emits many events across children components.
const handleSubmit = function () {
  try {
    if (input.value.length >= 2) {
      emitter.emit("use-input", input.value); //goes to {search-card}.
      emitter.emit("hide-buttons", false); //goes to {search-btns}.
      emitter.emit("show-results", true); //goes to {search-res & Search}.
      return;
    }
    return emitter.emit("invalid-word", 300);
  } catch (err) {
    emitter.emit("submit-error", [500, err.message]);
  }
};

const hideSearchButton = () => {
  emitter.emit("hide-search-button", false);
};
const showSearchButton = () => {
  emitter.emit("show-search-button", true);
};
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
