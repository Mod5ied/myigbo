<template>
  <div class="bottom_bar">
    <button @click="dispatch(Dispatch.add, true)" :to="{ name: 'AddWord' }"
      :class="useAdd ? 'side_span_active' : 'side_span'">
      <p class="bottom_bar_text">Add to library</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
      </svg>
      <p class="block text-xs md:hidden">Add</p>
    </button>
    <button @click="dispatch(Dispatch.update, true)" :to="{ name: 'UpdateWord' }"
      :class="useUpdate ? 'side_span_active' : 'side_span'">
      <p class="bottom_bar_text">Update a word</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
      <p class="block text-xs md:hidden">Update</p>
    </button>
    <button @click="dispatch(Dispatch.delete, true)" :to="{ name: 'DeleteWord' }"
      :class="useDelete ? 'side_span_active' : 'side_span'">
      <p class="bottom_bar_text">Delete a word</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg>
      <p class="block text-xs md:hidden">Delete</p>
    </button>
    <button @click="dispatch(Dispatch.peek, true)" :to="{ name: 'PeekWords' }"
      :class="usePeek ? 'bottom_bar_active' : 'bottom_bar_inactive'">
      <p class="bottom_bar_text">View library</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <p class="block text-xs md:hidden">Preview</p>
    </button>
    <button @click="dispatch(Dispatch.quiz, true)" :to="{ name: 'AddQuiz' }"
      :class="useQuiz ? 'side_span_active' : 'side_span'">
      <p class="bottom_bar_text">Add Audio</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
          clip-rule="evenodd" />
      </svg>
      <p class="block text-xs md:hidden">Quiz</p>
    </button>
    <span class="side_span" @click="emergency = !emergency">
      <button class="bottom_bar_text">My Utilities</button>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <p class="block text-xs md:hidden">Utilities</p>
      <div class="absolute flex gap-4 p-2 border -bottom-10 left-56 md:left-4 md:bottom-5" v-if="emergency">
        <span class="side_config">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd" />
          </svg>
          <button>Record</button>
        </span>
        <span class="side_config">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd" />
          </svg>
          <button>Quizzes</button>
        </span>
        <!-- <span class="side_config">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
          </svg>
          <button>Clear Library</button>
        </span> -->
      </div>
    </span>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

//initialize emitter.
const emitter = inject("emitter");

//reactive states.
const emergency = ref(false);

//style states.
let useAdd = ref(false);
let useQuiz = ref(false);
let usePeek = ref(false);
let useDelete = ref(false);
let useUpdate = ref(false);

//dispatch states.
const Dispatch = ref({
  add: "addWord",
  quiz: "addQuiz",
  delete: "deleteWord",
  update: "updateWord",
  peek: "peekWords",
});

//fn to emit.
const toggleView = (view, state, styleVar) => {
  emitter.emit(view, state); //👈emits view to toggle to Admin.
  styleVar.value = state;
};

const dispatch = (action, state) => {
  switch (action) {
    case "addWord":
      toggleView(action, state, useAdd);
      useQuiz.value = false;
      usePeek.value = false;
      useDelete.value = false;
      useUpdate.value = false;
      break;
    case "addQuiz":
      toggleView(action, state, useQuiz);
      useAdd.value = false;
      usePeek.value = false;
      useDelete.value = false;
      useUpdate.value = false;
      break;
    case "updateWord":
      toggleView(action, state, useUpdate);
      useAdd.value = false;
      useQuiz.value = false;
      usePeek.value = false;
      useDelete.value = false;
      break;
    case "deleteWord":
      toggleView(action, state, useDelete);
      useAdd.value = false;
      useQuiz.value = false;
      usePeek.value = false;
      useUpdate.value = false;
      break;
    case "peekWords":
      toggleView(action, state, usePeek);
      useAdd.value = false;
      useQuiz.value = false;
      useDelete.value = false;
      useUpdate.value = false;
      break;
    default:
      toggleView(action, state);
      break;
  }
};
</script>
<style scoped>
</style>
