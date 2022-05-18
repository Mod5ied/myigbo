<template>
  <div
    class="flex flex-col items-center justify-start w-full h-full gap-8 py-16 border-r font-body"
  >
    <button
      @click="dispatch(Dispatch.add, true)"
      :to="{ name: 'AddWord' }"
      class="btnAdd"
    >
      Add to library
    </button>
    <button
      @click="dispatch(Dispatch.update, true)"
      :to="{ name: 'UpdateWord' }"
      class="btnUpdate"
    >
      Update a word
    </button>
    <button
      @click="dispatch(Dispatch.delete, true)"
      :to="{ name: 'DeleteWord' }"
      class="btnDel"
    >
      Delete a word
    </button>
    <button
      @click="dispatch(Dispatch.peek, true)"
      :to="{ name: 'PeekWords' }"
      class="btnPeek"
    >
      View library
    </button>
    <button
      @click="dispatch(Dispatch.quiz, true)"
      :to="{ name: 'AddQuiz' }"
      class="btnQuiz"
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
      break;
    case "addQuiz":
      toggleView(action, state), useQuiz;
      break;
    case "updateWord":
      toggleView(action, state, useUpdate);
      break;
    case "deleteWord":
      toggleView(action, state, useDelete);
      break;
    case "peekWords":
      toggleView(action, state, usePeek);
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
