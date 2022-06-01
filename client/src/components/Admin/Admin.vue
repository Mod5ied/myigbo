<template>
  <div
    id="home"
    class="flex flex-col items-center justify-start overflow-x-hidden bg-gray-100 select-none dark:bg-slate-800"
  >
    <Header1 />
    <div class="flex w-full h-screen" id="main">
      <aside class="w-1/5">
        <Sidebar />
      </aside>
      <main class="flex justify-center w-4/5">
        <AddWord v-if="useAdd" />
        <AddQuiz v-if="useQuiz" />
        <DeleteWord v-if="useClear" />
        <UpdateWord v-if="useUpdate" />
        <PeekWords v-if="usePeek" />
        <!-- <img v-else src="../../assets/home.svg" class="w-1/2" alt=""> -->
      </main>
    </div>
  </div>
</template>
<script setup>
import isOnline from "is-online";
import { useRouter } from "vue-router";
import { Utilities, OfflineStorage } from "../../scripts/Services";
import { ref, inject, onMounted, defineAsyncComponent } from "vue";
import Header1 from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

const AddWord = defineAsyncComponent(() =>
  import("../Admin/views/AddWord.vue")
);
const AddQuiz = defineAsyncComponent(() =>
  import("../Admin/views/AddQuiz.vue")
);
const DeleteWord = defineAsyncComponent(() =>
  import("../Admin/views/DeleteWord.vue")
);
const UpdateWord = defineAsyncComponent(() =>
  import("../Admin/views/UpdateWord.vue")
);
const PeekWords = defineAsyncComponent(() =>
  import("../Admin/views/PeekWords.vue")
);

const { handleOffline, pushToCloud } = OfflineStorage;
const { returnState, returnSwitch } = Utilities;
const Router = useRouter();
const emitter = inject("emitter");

//async states
let useAdd = ref(false);
let useClear = ref(false);
let useUpdate = ref(false);
let useQuiz = ref(false);
let usePeek = ref(false);

//emitter listener for toggles.
emitter.on("addWord", (payload) => {
  useAdd.value = !useAdd.value;
  // with transition, use timeout to ease out wifout conflict.
  useClear.value = false;
  useUpdate.value = false;
  useQuiz.value = false;
  usePeek.value = false;
});
emitter.on("addQuiz", (payload) => {
  useQuiz.value = !useQuiz.value;
  // with transition, use timeout to ease out wifout conflict.
  useAdd.value = false;
  useClear.value = false;
  useUpdate.value = false;
  usePeek.value = false;
});
emitter.on("updateWord", (payload) => {
  useUpdate.value = !useUpdate.value;
  // with transition, use timeout to ease out wifout conflict.
  useAdd.value = false;
  useClear.value = false;
  useQuiz.value = false;
  usePeek.value = false;
});
emitter.on("deleteWord", (payload) => {
  useClear.value = !useClear.value;
  // with transition, use timeout to ease out wifout conflict.
  useAdd.value = false;
  useUpdate.value = false;
  useQuiz.value = false;
  usePeek.value = false;
});
emitter.on("peekWords", (payload) => {
  usePeek.value = !usePeek.value;
  // with transition, use timeout to ease out wifout conflict.
  useAdd.value = false;
  useClear.value = false;
  useUpdate.value = false;
  useQuiz.value = false;
});

//fetch data from idb on component mount.
onMounted(async () => {
  // await pushToCloud();
});

//! to be deprecated in production.
async function useSwitch(data) {
  await returnSwitch(
    data,
    localLoading,
    localLoaded,
    cloudLoading,
    cloudLoaded
  );
}
</script>

<style scoped>
#main {
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
#main::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
