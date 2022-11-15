<template>
  <div class="relative flex justify-center w-full cursor-pointer" :class="searchClass">
    <form @submit.prevent="handleSubmit" class="flex items-center justify-around w-full md:justify-start">
      <span class="relative flex items-center justify-center w-4/5 md:right-5 md:m-auto md:w-2/5">
        <input class="input-box" v-model.trim="input" type="text" :placeholder="placeholder" @focusin="hideSearchButton"
          @focusout="showSearchButton" />
        <!-- 👆 :oninput="hideResultComponent" -->
        <!-- 👇 options tab. -->
        <div class="input-icons" :class="dictClass">
          <i @click="toggleTranslator" v-if="notTyping" class="input-icons-style" title="Switch Translator">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 text-red-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>

          </i>
          <i class="input-icons-style" @click="showHistory" title="History">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </i>
          <!-- voice search not ready yet. -->
          <!-- <i class="input-icons-style" v-if="isTyping">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </i> -->
          <i class="input-icons-style" v-if="isTyping" @click="clearInputBox">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </i>
          <i class="input-icons-style" @click="showOptions">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </i>
        </div>
        <!-- 👇 history tab. -->
        <Transition>
          <SearchHistory v-if="useHistory" :show-history="useHistory" />
        </Transition>
      </span>
    </form>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect, defineAsyncComponent, onBeforeUnmount } from "vue";
import { get, set, delMany, update } from "idb-keyval"
const SearchHistory = defineAsyncComponent(() => import("../components/Search_history.vue"))
const text1 = "Translate Igbo words";
const text2 = "Translate English words";
// const useState = [false, true];
const emitter = inject("emitter");

//reactive input data.
let input = ref("");
let isTyping = ref(false);
let notTyping = ref(false);
let useHistory = ref(false)
let placeholder = ref(text2)
let dictClass = props.DictClass;
let searchClass = props.SearchClass;

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
const clearInputBox = () => {
  input.value = "";
};
const showOptions = () => {
  notTyping.value = !notTyping.value
}
const toggleTranslator = () => {
  if (placeholder.value == text2) return placeholder.value = text1
  return placeholder.value = text2
};

emitter.on("clear-input", () => {
  //comes from {Search}
  clearInputBox();
});
emitter.on("revert-btns", (payload) => {
  //comes from {search-btns}
  isTyping.value = payload[0];
  notTyping.value = payload[1];
});
emitter.on("append-to-search", (value) => {
  input.value = value;
})
emitter.on("hide-history", () => {
  useHistory.value = false;
})

//input 'fns()', emits many events across children components.
const handleSubmit = function () {
  try {
    if (input.value.length >= 2) {
      switch (placeholder.value) {
        case text1:
          emitter.emit("use-input-english", input.value); // 👉search
          emitter.emit("hide-buttons", false); // 👉search-btns
          emitter.emit("show-results", true); // 👉search-result & Search
          return saveHistory(input.value, "igboHistories");
        case text2:
          emitter.emit("use-input-igbo", input.value);
          emitter.emit("hide-buttons", false);
          emitter.emit("show-results", true);
          return saveHistory(input.value, "englishHistories");
      }
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
const showHistory = () => {
  if (useHistory.value == false ? useHistory.value = true : useHistory.value = false);
}

const saveHistory = async (value = "", history = "") => {
  const histories = await get(history);
  if (!histories || histories == undefined) {
    return await set(history, [value]);
  }
  histories.push(value)
  await set(history, histories);
}

const wipeHistories = async () => {
  await delMany(["englishHistories", "igboHistories"])
}
</script>