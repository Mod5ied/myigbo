<template>
  <div
    class="flex flex-col items-center justify-start w-full h-full gap-8 py-16 border-r dark:border-r-slate-800 bg-gray-50 dark:bg-slate-900 font-body"
  >
    <button
      @click="dispatch(Dispatch.add, true)"
      :to="{ name: 'AddWord' }"
      :class="useAdd ? 'side_span_active' : 'side_span'"
    >
      Add to library
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
        />
      </svg>
    </button>
    <button
      @click="dispatch(Dispatch.update, true)"
      :to="{ name: 'UpdateWord' }"
      :class="useUpdate ? 'side_span_active' : 'side_span'"
    >
      Update a word
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </button>
    <button
      @click="dispatch(Dispatch.delete, true)"
      :to="{ name: 'DeleteWord' }"
      :class="useDelete ? 'side_span_active' : 'side_span'"
    >
      Delete a word
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      @click="dispatch(Dispatch.peek, true)"
      :to="{ name: 'PeekWords' }"
      :class="usePeek ? 'side_span_active' : 'side_span'"
    >
      View library
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </button>
    <button
      @click="dispatch(Dispatch.quiz, true)"
      :to="{ name: 'AddQuiz' }"
      :class="useQuiz ? 'side_span_active' : 'side_span'"
    >
      Add a quiz
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
        />
      </svg>
    </button>
    <span class="side_span">
      <button @click="emergency = !emergency">Emergency config</button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <div
        class="absolute flex gap-4 p-2 left-4 bottom-5 border"
        v-if="emergency"
      >
        <span class="side_config">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
            />
            <path
              d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
            />
            <path
              d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
            />
          </svg>
          <button>Offline</button>
        </span>
        <span class="side_config">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
            />
          </svg>
          <button>Cloud</button>
        </span>
        <span class="side_config">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
            />
          </svg>
          <button>Clear Library</button>
        </span>
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
.btnAdd {
  background: v-bind(useAdd);
}
.btnQuiz {
  background: v-bind(useQuiz);
}
.btnDel {
  background: v-bind(useDel);
}
.btnUpdate {
  background: v-bind(useUpdate);
}
.btnPeek {
  background: v-bind(usePeek);
}
</style>
