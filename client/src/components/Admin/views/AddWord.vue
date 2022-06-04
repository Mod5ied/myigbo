<template>
  <div
    class="flex flex-col items-center w-1/2 h-full gap-6 p-4 mr-40 font-body"
  >
    <span
      class="flex justify-between w-3/4 overflow-hidden bg-blue-300 rounded-md mt-14"
    >
      <button
        @click="formsToggle('showTrans')"
        class="w-1/2 px-6 text-sm font-bold text-gray-100 bg-blue-500"
      >
        Translations
      </button>
      <button
        @click="formsToggle('showDict')"
        class="w-1/2 p-2 text-sm font-bold text-gray-50"
      >
        Dictionary
      </button>
    </span>
    <!-- forms below 👇 -->
    <form
      v-if="useTrans"
      @submit.prevent="submitWord"
      class="flex flex-col justify-around w-full gap-3 p-6 border rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-slate-700 h-3/4"
    >
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="english">English Word</label>
        <input
          type="text"
          id="english"
          name="english"
          placeholder="Enter an English word"
          required
          v-model.trim="name"
          class="dark_inputs"
        />
      </div>
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="igbo">Igbo Translation</label>
        <input
          type="text"
          id="igbo"
          name="igbo"
          placeholder="Enter Igbo translation"
          required
          v-model.trim="translation"
          class="dark_inputs"
        />
      </div>
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="igbo">Word Genre</label>
        <input
          type="text"
          id="genre"
          name="igbo"
          placeholder="e.g: (Noun, Verb, etc.)"
          required
          v-model.trim="genre"
          class="dark_inputs"
        />
      </div>
      <!-- submitting section -->
      <span class="flex flex-row items-center gap-2 p-2 text-right">
        <button
          class="sub-btns hover:bg-emerald-500 dark:text-emerald-500 dark:hover:text-slate-200 hover:text-slate-200 hover:shadow-md hover:border-transparent"
        >
          Upload
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
          <i class="flex flex-row items-center" v-if="ok_upload">
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
          <!-- failed state-->
          <i class="flex flex-row items-center" v-if="fail_upload">
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
        </button>
      </span>
    </form>
    <form
      v-if="useDict"
      @submit.prevent="submitDict"
      class="flex flex-col justify-around w-full gap-3 p-6 border rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-slate-700 h-3/4"
    >
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="english">English Word</label>
        <input
          type="text"
          id="english"
          name="english"
          placeholder="Enter an English word"
          required
          v-model.trim="name"
          class="dark_inputs"
        />
      </div>
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="igbo">Igbo Translation</label>
        <input
          type="text"
          id="igbo"
          name="igbo"
          placeholder="Enter Igbo translation"
          required
          v-model.trim="translation"
          class="dark_inputs"
        />
      </div>
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="igbo">Word Genre</label>
        <input
          type="text"
          id="genre"
          name="igbo"
          placeholder="e.g: (Noun, Verb, etc.)"
          required
          v-model.trim="genre"
          class="dark_inputs"
        />
      </div>
      <div
        class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 dark:text-slate-200 font-body"
      >
        <label for="igbo">Definitions</label>
        <textarea
          type="text"
          id="igbo"
          name="igbo"
          placeholder="enter definitions and bits of history."
          required
          v-model.trim="definitions"
          class="dark_inputs"
        />
      </div>
      <!-- submitting section -->
      <span class="flex flex-row items-center gap-2 p-2 text-right">
        <button
          class="sub-btns hover:bg-emerald-500 dark:text-emerald-500 dark:hover:text-slate-200 hover:text-slate-200 hover:shadow-md hover:border-transparent"
        >
          Upload
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
          <i class="flex flex-row items-center" v-if="ok_upload">
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
          <!-- failed state-->
          <i class="flex flex-row items-center" v-if="fail_upload">
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
        </button>
      </span>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import isOnline from "is-online";
import { Requests, OfflineStorage } from "../../../scripts/Services";
import { useRouter } from "vue-router";
const { handleOffline } = OfflineStorage;
const { addNewPost } = Requests;
const Router = useRouter();

//submit states.
let fail_upload = ref(false);
let ok_upload = ref(false);
let loading = ref(false);
let errMessage = ref("");
const ok_class = ref("text-green-600");
const fail_class = ref("text-red-500");

//input states.
let name = ref("");
let genre = ref("");
let translation = ref("");
let definitions = ref("");
let useDict = ref(false);
let useTrans = ref(false);

//watcher to smallint user-input
watchEffect(() => {
  name.value = name.value.toLowerCase();
  genre.value = genre.value.toLowerCase();
  translation.value = translation.value.toLowerCase();
});

//fn to submit form.
async function submitWord() {
  try {
    const onlineState = await isOnline();
    if (
      onlineState !== true
        ? await addNewPost(
            fail_upload,
            loading,
            errMessage,
            ok_upload,
            name.value,
            translation.value,
            genre.value,
            Router
          )
        : await handleOffline(name.value, translation.value, genre.value)
    );
  } catch (err) {
    console.log(err.message);
    /* use a logger and errorHandler here instead */
  }
}
async function submitDict() {
  try {
  } catch (err) {
    console.log(err.message);
    /* use a logger and errorHandler here instead */
  }
}
//fn to toggle forms views.
const formsToggle = (state) => {
  switch (state) {
    case "showDict":
      useDict.value = !useDict.value;
      useTrans.value = false;
      break;
    case "showTrans":
      useTrans.value = !useTrans.value;
      useDict.value = false;
      break;

    default:
      useTrans.value = false;
      useDict.value = false;
      break;
  }
};
</script>
