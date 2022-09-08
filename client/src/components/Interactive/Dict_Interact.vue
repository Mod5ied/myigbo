<template>
  <div class="flex flex-col items-center w-full gap-2 px-4 py-3" :class="dyna_class">
    <h2 class="font-extrabold text-gray-700 dark:text-orange-400">
      QUIZ TIME!
    </h2>
    <div id="parent" class="flex flex-col gap-3 py-2 rounded-md bg-slate-300 dark:bg-slate-700">
      <span id="query" class="p-2 text-sm">
        <p class="p-2 text-gray-700 dark:text-slate-300">
          Gini bu aha onye dere akwukwuo - "Things fall apart"?
        </p>
        <Transition>
          <p v-if="useTranslation" class="p-2 text-gray-700 dark:text-slate-300">
            Who wrote the book - "Things fall apart"?
          </p>
        </Transition>
        <i class="flex items-center justify-end p-2 text-orange-400" @click="useTrans">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
        </i>
      </span>
      <span id="btns" class="flex flex-col items-center gap-1 px-5 py-1">
        <button class="dict_interact_btn">
          <p class="flex items-center p-1 text-gray-600 rounded-full bg-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </p>
          Chinua Achebe
        </button>
        <button class="dict_interact_btn">
          <p class="flex items-center p-1 text-gray-600 rounded-full bg-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </p>
          Wole Soyinka
        </button>
        <button class="dict_interact_btn">
          <p class="flex items-center p-1 text-gray-600 rounded-full bg-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </p>
          Chinua Achebe
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  dynamicClass: String,
});

let useTranslation = ref(false);
let dyna_class = props.dynamicClass;

//fn to set useTranslation to true.
function useTrans() {
  useTranslation.value = !useTranslation.value;
}


/* Upcoming features:
    (1) Verification of users selection and notifying if users are correct.
    (2) Forward users to the next quiz if users passes each test.
    (3) Presenting a leaders board to current users based on others users who played the quiz.
*/
</script>
