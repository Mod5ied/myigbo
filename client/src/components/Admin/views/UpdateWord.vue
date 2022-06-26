<template>
  <div
    class="flex flex-col items-center w-full h-full gap-6 p-4 md:w-1/2 md:mr-40 font-body"
  >
    <span
      class="flex justify-between w-full overflow-hidden text-sm bg-blue-300 rounded-md md:w-3/4 mt-14"
    >
      <button
        @click="formsToggle('showRecords')"
        class="w-1/2 px-6 font-bold text-gray-100 bg-blue-500"
      >
        Words/Records
      </button>
      <button
        @click="formsToggle('showQuiz')"
        class="w-1/2 p-2 font-bold text-gray-50"
      >
        Quizzes
      </button>
    </span>
    <!-- forms1(genre) here👇 -->
    <form
      @submit.prevent="updateRecords"
      class="patch_forms h-3/5"
      v-if="showRecords"
    >
      <div
        class="flex flex-col justify-start w-full gap-6 text-gray-800 dark:text-slate-200 font-body"
      >
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchName" class="px-2">Enter the word</label>
          <input
            type="text"
            placeholder="English word only!"
            v-model.trim="patchName"
            required
            class="dark_inputs"
          />
        </span>
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchGenre" class="px-2">New Translation?</label>
          <input
            type="text"
            placeholder="e.g: Medicals(Noun)"
            v-model.trim="patchTranslation"
            required
            class="dark_inputs"
          />
        </span>
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchGenre" class="px-2">New Genre?</label>
          <input
            type="text"
            placeholder="e.g: Medicals(Noun)"
            v-model.trim="patchGenre"
            required
            class="dark_inputs"
          />
        </span>
      </div>
      <!-- submitting section👇 -->
      <span class="flex flex-row items-center gap-2 p-2 text-right">
        <button
          class="sub-btns hover:text-slate-100 dark:text-emerald-500 dark:hover:text-slate-200 hover:bg-emerald-500 hover:shadow-md hover:border-transparent"
        >
          Update
          <!-- loading state -->
          <i class="flex items-center" v-if="loading">
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
          <!-- loaded state -->
          <i class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="ok_class"
              v-if="ok_patch"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="fail_class"
              v-if="fail_patch"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </button>
        <div
          @click="useDropdown = !useDropdown"
          class="patch_dropdown"
          title="Selects the category to update"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 hover:text-blue-700"
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
        <div v-if="useDropdown" class="use_dropdown">
          <button
            @click="dispatch('word')"
            class="use_buttons"
            title="Updates a simple word's translations"
          >
            Word
          </button>
          <button
            @click="dispatch('dict')"
            class="border-t use_buttons border-slate-500 dark:border-slate-300"
            title="Updates the dictionary record"
          >
            Dictionary
          </button>
        </div>
      </span>
    </form>
    <!-- forms2(defs here 👇 -->
    <form
      @submit.prevent="updateQuizzes"
      class="patch_forms h-3/4"
      v-if="showQuiz"
    >
      <div
        class="flex flex-col justify-start w-full gap-6 text-gray-800 dark:text-slate-200 font-body"
      >
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchName" class="px-2">Enter quiz code</label>
          <input
            type="text"
            placeholder="Quiz code"
            v-model.trim="quizCode"
            required
            class="dark_inputs"
          />
        </span>

        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchGenre" class="px-2">New answer?</label>
          <input
            type="text"
            placeholder="New Answer here"
            v-model.trim="quizRight"
            class="dark_inputs"
          />
        </span>
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchGenre" class="px-2">New wrong1?</label>
          <input
            type="text"
            placeholder="New wrong here"
            v-model.trim="quizWrong"
            class="dark_inputs"
          />
        </span>
        <span
          class="flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center"
        >
          <label for="patchGenre" class="px-2">New wrong2?</label>
          <input
            type="text"
            placeholder="Another wrong here"
            v-model.trim="quizWrong2"
            class="dark_inputs"
          />
        </span>
      </div>
      <!-- submitting section -->
      <span class="flex flex-row items-center gap-2 p-2 text-right">
        <button
          class="sub-btns dark:text-emerald-500 dark:hover:text-slate-200 hover:bg-emerald-500 hover:text-slate-100 hover:shadow-md hover:border-transparent"
        >
          Update
          <!-- loading state -->
          <i class="flex items-center" v-if="loading">
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
          <!-- loaded state -->
          <i class="flex flex-row items-center" v-if="ok_patch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="fail_class"
              v-if="fail_patch"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </button>
        <div
          @click="useDropdown = !useDropdown"
          class="patch_dropdown"
          title="Selects the category to update"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 hover:text-blue-700"
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
        <div v-if="useDropdown" class="use_dropdown">
          <button
            @click="dispatch('quiz/search')"
            class="use_buttons"
            title="Updates a simple word's translations"
          >
            Word
          </button>
          <button
            @click="dispatch('quiz/dict')"
            class="border-t use_buttons border-slate-500 dark:border-slate-300"
            title="Updates the dictionary record"
          >
            Dictionary
          </button>
        </div>
      </span>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { Requests, OfflineStorage } from "../../../scripts/Services";
const { patchPost } = Requests;

//forms state.
let showQuiz = ref(false);
let showRecords = ref(false);
let useDropdown = ref(false);

//inputs state.
let patchName = ref("");
let patchGenre = ref("");
let patchTranslation = ref("");

let quizCode = ref(null);
let quizRight = ref("");
let quizWrong = ref("");
let quizWrong2 = ref("");

//submit states.
const fail_class = ref("text-red-500");
const ok_class = ref("text-green-600");
let fail_patch = ref(false);
let useConstant = ref("");
let ok_patch = ref(false);
let loading = ref(false);
let errMessage = ref("");

//watcher to lowercase input-states values.
watchEffect(() => {
  patchName.value = patchName.value.toLowerCase();
  patchGenre.value = patchGenre.value.toLowerCase();
  patchTranslation.value = patchTranslation.value.toLowerCase();
});

//fn to toggle forms states.
const formsToggle = (state) => {
  switch (state) {
    case "showRecords":
      showRecords.value = !showRecords.value;
      showQuiz.value = false;
      break;
    case "showQuiz":
      showQuiz.value = !showQuiz.value;
      showRecords.value = false;
      break;
    default:
      showQuiz.value = !showQuiz.value;
      showRecords.value = false;
      break;
  }
};
//fn to toggle dropdown.
const dispatch = (constant) => {
  switch (constant) {
    case "word":
      useDropdown.value = !useDropdown.value;
      useConstant.value = constant;
      break;
    case "dict":
      useDropdown.value = !useDropdown.value;
      useConstant.value = constant;
      break;
    case "quiz/search":
      useDropdown.value = !useDropdown.value;
      useConstant.value = constant;
      break;
    default:
      break;
  }
};

//fns to submit and update.
const updateRecords = async () => {
  await patchPost(
    fail_patch.value,
    ok_patch.value,
    loading.value,
    errMessage.value,
    patchName.value,
    patchGenre.value,
    patchTranslation.value,
    "",
    "",
    "",
    "",
    useConstant
  );
};
const updateQuizzes = async () => {
  await patchPost(
    fail_patch.value,
    ok_patch.value,
    loading.value,
    errMessage.value,
    patchName.value,
    patchTranslation.value
  );
};
</script>
