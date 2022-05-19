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
    </button>
    <button
      @click="dispatch(Dispatch.update, true)"
      :to="{ name: 'UpdateWord' }"
      :class="useUpdate ? 'side_span_active' : 'side_span'"
    >
      Update a word
    </button>
    <button
      @click="dispatch(Dispatch.delete, true)"
      :to="{ name: 'DeleteWord' }"
      :class="useDelete ? 'side_span_active' : 'side_span'"
    >
      Delete a word
    </button>
    <button
      @click="dispatch(Dispatch.peek, true)"
      :to="{ name: 'PeekWords' }"
      :class="usePeek ? 'side_span_active' : 'side_span'"
    >
      View library
    </button>
    <button
      @click="dispatch(Dispatch.quiz, true)"
      :to="{ name: 'AddQuiz' }"
      :class="useQuiz ? 'side_span_active' : 'side_span'"
    >
      Add a quiz
    </button>
    <span class="side_span">
      <button @click="emergency = !emergency">Emergency config</button>
      <div class="absolute flex gap-8 p-2 left-4 bottom-5" v-if="emergency">
        <span><i></i> <button>Offline</button> </span>
        <span><i></i> <button>Cloud</button> </span>
        <span><i></i> <button>Clear Library</button> </span>
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
