<template>
  <div class="flex flex-col items-center absolute z-20 w-full h-full gap-1 p-4 md:w-1/2">
    <div class="delete_body">
      <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
        <h2 class="delete_btn" @click="useDelete = !useDelete" v-if="showBtn">
          Delete a Word Here:
        </h2>
        <span class="flex items-center justify-between gap-2 md:w-3/5" v-if="useDelete">
          <button :class="
            useWord ? 'delete_section_span_active' : 'delete_section_span'
          " @click="dispatch('word')">
            Word
          </button>
          <button :class="
            useDict ? 'delete_section_span_active' : 'delete_section_span'
          " @click="dispatch('dict')">
            Dictionary
          </button>
          <button :class="
            useQuiz ? 'delete_section_span_active' : 'delete_section_span'
          " @click="dispatch('quiz/search')">
            Quizzes
          </button>
        </span>
      </div>
      <form @submit.prevent="removeWord" class="adminFormsDelete bg-gray-100 border border-slate-300" v-if="useDelete">
        <span class="uploadWordSpans">
          <label for="deleteConst" class="text-sm font-semibold">Enter word:</label>
          <input type="text" placeholder="English words only!" v-model.trim="input" required class="dark_inputs"
            @focusin="ok_delete = false, fail_delete = false, loading = false" @change="useError = false" />
        </span>
        <!-- submitting here 👇 -->
        <span class="flex flex-row items-center gap-2 p-2 w-full md:w-4/5 text-right">
          <button class="btns-danger">
            Delete word
            <i class="flex flex-row items-center">
              <!-- success state -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5" viewBox="0 0 20 20" fill="currentColor"
                :class="ok_class" v-if="ok_delete">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <!-- failed state -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"
                :class="fail_class" v-if="fail_delete">
                <path fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd" />
              </svg>
              <!-- loading state -->
              <svg role="status" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-red-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="loading">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"></path>
              </svg>
            </i>
          </button>
        </span>
        <span class="mx-auto" v-if="useError">
          <p class="text-sm text-red-400">{{ errMessage }}</p>
        </span>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { Requests } from "../../proxy/Services";
const { deletePost } = Requests;

//show states.
let useDelete = ref(false);

//input & submit states.
const ok_class = ref("text-green-600");
const fail_class = ref("text-red-500");
let deleteConst = ref("");
let fail_delete = ref(false);
let ok_delete = ref(false);
let loading = ref(false);
let useError = ref(true);
let errMessage = ref("");
let useDict = ref(false);
let useWord = ref(false);
let useQuiz = ref(false);
let showBtn = ref(false);
let input = ref("");

function toggleDeleteButton() {
  if (useDelete.value === true) {
    return showBtn.value = false
  }
  showBtn.value = true
}
//watcher to lowercase input state.
watchEffect(() => {
  input.value = input.value.toLowerCase();
  deleteConst.value = deleteConst.value.toLowerCase();
  toggleDeleteButton()
});


async function removeWord() {
  if (deleteConst.value.length < 5) {
    return flashError("Select category above");
  }
  let response;
  deletePost(
    fail_delete,
    loading,
    deleteConst,
    errMessage,
    ok_delete,
    input
  )
    .then(res => flashError(errMessage.value), errMessage.value = null)
    .catch(err => flashError(err));
}

// input constant toggler.
const useInput = (constant) => {
  deleteConst.value = `${constant}/`;
};

const dispatch = (constant) => {
  switch (constant) {
    case "word":
      useInput(constant);
      useWord.value = true;
      useDict.value = false;
      useQuiz.value = false;
      break;
    case "dict":
      useInput(constant);
      useDict.value = true;
      useWord.value = false;
      useQuiz.value = false;
      break;
    case "quiz/search":
      useInput(constant);
      useQuiz.value = true;
      useDict.value = false;
      useWord.value = false;
      break;
  }
};

function flashError(err) {
  useError.value = true;
  errMessage.value = err;
  setTimeout(() => {
    useError.value = false;
  }, 2000);
}
</script>
