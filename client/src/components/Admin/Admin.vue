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
              <p class="flex items-center gap-2 text-sm font-semibold text-center font-body text-slate-500 dark:text-slate-200">
                {{ syncMessage }}
                <svg v-if="!syncOk" role="status"
                  class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-100 fill-yellow-600" viewBox="0 0 100 101"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"></path>
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
    <Sidebar class="md:hidden" />
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
emitter.on("useSyncError", payload => {
  useSync.value = true; syncOk.value = false; syncMessage.value = payload;
  setTimeout(() => {
    useSync.value = false; syncMessage.value = null;
  }, 3000);
})
emitter.on("syncOfflineData", async (payload) => {
  switch (payload[0]) {
    case "word":
      // console.log('word');
      // break
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

//fetch data from idb on component mount.
onMounted(async () => {
  // await syncData("word", [syncMessage.value, "wordsStore"])
});
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
