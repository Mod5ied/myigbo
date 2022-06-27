<template>
  <div
    class="flex flex-col items-center w-full h-full gap-6 p-4 md:w-4/5 font-body"
  >
    <span
      class="flex justify-between w-full mt-12 overflow-hidden rounded-md md:w-3/5 bg-slate-300 dark:bg-slate-600"
    >
      <div v-if="dropDownRecords" class="use_dropdown_peek_left">
        <button
          @click="dispatch('allWords')"
          class="use_buttons"
          title="Selects to load all search words"
        >
          Words
        </button>
        <button
          @click="dispatch('allRecords')"
          class="border-t use_buttons border-slate-500 dark:border-slate-400"
          title="Selects to load all dictionary words"
        >
          Dictionary
        </button>
      </div>
      <div
        @click="dropDownRecords = !dropDownRecords"
        class="peek_dropdown"
        title="Selects the record category to update"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-blue-700 dark:hover:text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <!-- right-btn FETCH-RECORDS-->
      <button
        @click="fetchRecords(constant)"
        class="flex flex-row justify-center w-1/2 gap-2 p-2 text-sm font-bold text-gray-100 bg-blue-500"
      >
        View Records
        <!-- loading state -->
        <i class="flex items-center" v-if="recordServe">
          <svg
            role="status"
            class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
        </i>
        <!-- failed state -->
        <i class="flex flex-row items-center" v-if="recordFail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="fail_class"
          >
            <path
              fill-rule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
        <!-- loaded state -->
        <i class="flex flex-row items-center" v-if="recordOk">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="ok_class"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </button>
      <!-- left btn FETCH-QUIZZES-->
      <button
        @click="fetchQuizzes(quizConstant)"
        class="flex flex-row justify-center w-1/2 gap-2 p-2 text-sm font-bold bg-red-300 text-gray-50"
      >
        View Quizzes
        <!-- loading state -->
        <i class="flex items-center" v-if="quizServe">
          <svg
            role="status"
            class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
        </i>
        <!-- failed state -->
        <i class="flex flex-row items-center" v-if="quizFail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="fail_class"
          >
            <path
              fill-rule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
        <!-- loaded state -->
        <i class="flex flex-row items-center" v-if="quizOk">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="ok_class"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </button>
      <div
        @click="dropDownQuizzes = !dropDownQuizzes"
        class="peek_dropdown"
        title="Selects the quiz category to view"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-blue-700 dark:hover:text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div v-if="dropDownQuizzes" class="use_dropdown_peek_right">
        <button
          @click="dispatch('search')"
          class="use_buttons"
          title="Selects to load search page quizzes"
        >
          SearchPage
        </button>
        <button
          @click="dispatch('dict')"
          class="border-t use_buttons border-slate-500 dark:border-slate-400"
          title="Selects to load dictionary page quizzes"
        >
          DictPage
        </button>
      </div>
    </span>
    <div class="flex flex-row gap-4 p-2">
      <div
        class="flex flex-row flex-wrap w-full gap-1 p-1 border border-gray-200 rounded-md dark:border-slate-500"
      >
        <li
          class="tags"
          v-if="useWords"
          v-for="{ name, translation, genre, _id } in allWords"
          :key="_id"
        >
          {{ name }} - {{ translation }} @ {{ genre }}
        </li>
        <li
          class="tags"
          v-if="useRecords"
          v-for="{ name, translation: [trans], genre, definitions } in allDict"
          :key="_id"
        >
          {{ name }} - {{ trans.commonTranslate }}, {{ trans.primitive}} - {{ definitions }} @
          {{ genre }}
        </li>
      </div>
    </div>
    <span class="mx-auto" v-if="useError">
      <p class="text-sm text-red-400 md:text-base">{{ errMessage }}</p>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Requests, OfflineStorage } from "../../../scripts/Services";
const { fetchWords, fetchDictionary } = Requests;

//states.
let allWords = ref([]);
let allDict = ref([]);
let allQuizzes = ref([]);
let useWords = ref(false);
let useRecords = ref(false);
let constant = ref("");
let quizConstant = ref("");
const ok_class = ref("text-green-600");
const fail_class = ref("text-red-500");

//load states.
let dropDownRecords = ref(false);
let dropDownQuizzes = ref(false);
let recordServe = ref(false);
let recordOk = ref(false);
let recordFail = ref(false);
let quizServe = ref(false);
let quizOk = ref(false);
let quizFail = ref(false);
let useError = ref(false);
let errMessage = ref("");

async function fetchRecords(factor) {
  if (!factor || factor == null) {
    return flashError(), (errMessage.value = "Select the category!");
  }
  switch (factor) {
    case "allWords":
      fetchWords(recordOk, recordServe, allWords, recordFail)
        .then(
          (res) => (useError.value = false),
          (useRecords.value = false),
          (useWords.value = true)
        )
        .catch((e) => (useError.value = true));
      return (constant.value = null);
    case "allRecords":
      fetchDictionary(recordOk, recordServe, allDict, recordFail)
        .then(
          (res) => (useError.value = false),
          (useWords.value = false),
          (useRecords.value = true)
        )
        .catch((e) => (useError.value = true));
      return (constant.value = null);
    default:
      return (useError.value = true);
  }
}
async function fetchQuizzes(factor) {
  if (!factor || factor == null) {
    return flashError(), (errMessage.value = "Select the category!");
  }
}

function dispatch(factor) {
  switch (factor) {
    case "allWords":
      return (constant.value = factor), (dropDownRecords.value = false);
    case "allRecords":
      return (constant.value = factor), (dropDownRecords.value = false);
    case "search":
      return (constant.value = factor), (dropDownQuizzes.value = false);
    case "dict":
      return (constant.value = factor), (dropDownQuizzes.value = false);
    default:
      break;
  }
}
function flashError() {
  useError.value = true;
  setTimeout(() => {
    useError.value = false;
  }, 3000);
}
</script>
