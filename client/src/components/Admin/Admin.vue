<template>
  <div id="home"
    class="flex flex-col items-center justify-start overflow-x-hidden bg-gray-100 select-none dark:bg-slate-800">
    <Header1 />
    <div class="flex w-screen h-screen" id="main">
      <aside class="hidden md:w-1/5 md:flex">
        <Sidebar />
      </aside>
      <main class="flex justify-center w-full overflow-x-hidden">
        <Transition>
          <div v-if="useError" class="error-card">
            <div>
              <h3 class="text-center text-slate-500 dark:text-slate-200">
                {{ errorState }}
              </h3>
            </div>
          </div>
        </Transition>
        <Transition>
          <div v-if="useSync"
            :class="syncOk ? 'border-emerald-500 dark:border-emerald-700 sync-card' : 'border-yellow-500 sync-card dark:border-yellow-600'">
            <div>
              <p
                class="flex items-center gap-2 text-sm font-semibold text-center font-body text-slate-500 dark:text-slate-200">
                {{ syncMessage }}
                <svg v-if="!syncOk" xmlns="http://www.w3.org/2000/svg" class="w-6 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-if="syncOk" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-green-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </p>
            </div>
          </div>
        </Transition>
        <AddWord v-if="useAdd" />
        <AddQuiz v-if="useQuiz" />
        <DeleteWord v-if="useClear" />
        <UpdateWord v-if="useUpdate" />
        <PeekWords v-if="usePeek" />
        <!-- <img v -else src="../../assets/home.svg" class="w-1/2" alt=""> -->
      </main>
    </div>
    <Sidebar class="absolute bottom-0 md:hidden" />
  </div>
</template>
<script setup>
import isOnline from "is-online";
import { ref, inject, onMounted, defineAsyncComponent } from "vue";
import { OfflineStorage } from "../../scripts/Services";
import { useRouter } from "vue-router";
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

const { pushToCloud } = OfflineStorage;
const emitter = inject("emitter");
const Router = useRouter();

//async states
let useUpdate = ref(false);
let useClear = ref(false);
let useError = ref(false);
let useQuiz = ref(false);
let usePeek = ref(false);
let useAdd = ref(false);
let useSync = ref(false);
let syncOk = ref(false);
let syncLoad = ref(false);
let syncMessage = ref("Synchronizing offline data");

//emitter listener for toggles.
emitter.on("addWord", () => {
  useAdd.value = !useAdd.value; useClear.value = false; useUpdate.value = false;
  useQuiz.value = false; usePeek.value = false;
});
emitter.on("addQuiz", () => {
  useQuiz.value = !useQuiz.value; useAdd.value = false; useClear.value = false;
  useUpdate.value = false; usePeek.value = false;
});
emitter.on("updateWord", () => {
  useUpdate.value = !useUpdate.value; useAdd.value = false; useClear.value = false;
  useQuiz.value = false; usePeek.value = false;
});
emitter.on("deleteWord", () => {
  useClear.value = !useClear.value; useAdd.value = false; useUpdate.value = false;
  useQuiz.value = false; usePeek.value = false;
});
emitter.on("peekWords", () => {
  usePeek.value = !usePeek.value; useAdd.value = false; useClear.value = false;
  useUpdate.value = false; useQuiz.value = false;
});
emitter.on("useSyncPass", payload => {
  useSync.value = true; syncOk.value = false; syncLoad.value = true; syncMessage.value = payload
  setTimeout(() => {
    syncLoad.value = false; syncOk.value = true; useSync.value = false;
  }, 4000)
})


emitter.on("useSyncInfo", payload => {
  useSync.value = true; syncOk.value = false; syncLoad.value = false; syncMessage.value = payload
  setTimeout(() => {
    useSync.value = false; syncMessage.value = null;
  }, 3000);
})


emitter.on("useSyncError", payload => {
  useSync.value = true; syncOk.value = false; syncMessage.value = payload;
  setTimeout(() => {
    useSync.value = false; syncMessage.value = null;
  }, 3000);
})
emitter.on("syncOfflineData", async (payload) => {
  switch (payload[0]) {
    case "word":
      return await syncData(payload[0], payload);
    case "record":
      return await syncData(payload[0], payload);
    case "search":
      return await syncData(payload[0], payload);
    case "dict":
      return await syncData(payload[0], payload);
  }
})
async function syncData(constant, payload) {
  // await pushToCloud(constant, syncMessage, payload[1]);
  useSync.value = true; syncMessage.value = payload[1];
  try {
    await pushToCloud(constant, syncMessage, syncOk, payload[2])
    setTimeout(() => {
      useSync.value = false;
    }, 5000)
  } catch (err) {
    setTimeout(() => {
      useSync.value = false;
    }, 5000)
  }
}

//   return pushToCloud(constant, syncMessage, payload[2])
//     .then(res => {
//       syncOk.value = true, syncLoad.value = false, setTimeout(() => {
//         useSync.value = false; //syncMessage.value = null
//       }, 3000)
//     })
//     .catch(err => {
//       syncOk.value = false, syncLoad.value = false, setTimeout(() => {
//         useSync.value = false; //syncMessage.value = null
//       }, 3000)
//     })
//
/* Deprecated, now being called within components that requires it. */
// //fetch data from idb on component mount.
// onMounted(async () => {
//   // await syncData("word", [syncMessage.value, "wordsStore"])
// });
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
