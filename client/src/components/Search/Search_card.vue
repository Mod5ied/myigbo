<template>
  <div
    class="flex flex-col justify-center w-full p-3 bg-cyan-600 rounded-md shadow-lg dark:bg-slate-700 md:w-1/3"
  >
    <div v-if="!useError">
      <span class="flex flex-row justify-between px-4 py-2">
        <h3 class="text-2xl font-bold text-gray-100 dark:text-slate-300">
          {{ userRecord.translation }}
        </h3>
        <i
          title="Listen"
          class="flex items-center p-2 transition bg-red-400 rounded-md hover:bg-red-500 hover:duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-200"
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
      </span>
      <span
        class="flex items-center justify-start gap-4 px-4 py-2 text-sm text-slate-200 dark:text-slate-300"
      >
        <p class="text-red-500">Show IPA / genre</p>
        <p>[{{ userRecord.genre }}]</p>
      </span>
      <p
        class="px-4 py-2 text-sm font-medium text-slate-200 dark:text-slate-300"
      >
        {{ userRecord.name }}
      </p>
    </div>
    <div v-if="useError" class="p-2 flex justify-center select-none">
      <h3 class="text-slate-200 dark:text-slate-300">{{ errorState }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { ErrorStates } from "../../scripts/ErrorScript";
const { errorMatcher } = ErrorStates;

//registers props from {Search_result}.
const props = defineProps({
  userInput: String,
  useArray: {
    type: Array,
  },
  fnExec: String,
});

//reactive template states.
let userInput = props.userInput;
let useArray = props.useArray;
let useExec = props.fnExec;
let userRecord = ref(null);
let useError = ref(false); //👈 toggles the error-display template (to be created) || discard data in card, and replace with single div of - 'data not found'
let errorState = ref(""); // study how to suggest another word similar to user input with javascript);

//fn to filter and return exact values.
const findWord = (input) => {
  //seek to manage app crash, should useArray be undefined||null.
  const result = useArray.find((obj) => obj.name === input);
  if (!result || result === null) {
    useError.value = true;
    errorMatcher(404, errorState);
    return;
  }
  useError.value = false;
  userRecord.value = result;
};

// watchers -> to execute method.
watchEffect(() => {
  useExec = findWord(userInput);
});
</script>
