<template>
  <div
    class="flex flex-col items-center justify-start overflow-x-hidden select-none"
  >
    <Header1 />
    <div class="w-full h-screen">
      <aside class="h-full">
        <Sidebar />
      </aside>
      <main>
        <AddWord v-if="useAdd" />
        <!-- <AddQuiz v-if="useQuiz" /> -->
        <!-- <DeleteWord v-if="useDelete" /> -->
        <!-- <UpdateWord v-if="useUpdate" /> -->
        <!-- <PeekWords v-if="usePeekWords" /> -->
      </main>
    </div>
  </div>
</template>
<script setup>
import isOnline from "is-online";
import { useRouter } from "vue-router";
import { StateProxy } from "../../scripts/Proxy";
import { Requests, Utilities, OfflineStorage } from "../../scripts/Services";
import {
  ref,
  toRefs,
  unref,
  computed,
  reactive,
  onMounted,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import Header1 from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

const AddWord = defineAsyncComponent(() =>
  import("../Admin/views/AddWord.vue")
);
const AddQuiz = defineAsyncComponent(() => {
  import("../Admin/views/AddQuiz.vue");
});
const DeleteWord = defineAsyncComponent(() => {
  import("../Admin/views/DeleteWord.vue");
});
const UpdateWord = defineAsyncComponent(() => {
  import("../Admin/views/UpdateWord.vue");
});
const PeekWords = defineAsyncComponent(() => {
  import("../Admin/views/PeekWords.vue");
});

const { getState } = StateProxy;
const { handleOffline, pushToCloud } = OfflineStorage;
const { returnState, returnSwitch } = Utilities;
const { fetchAllPost, addNewPost, deletePost, patchPost, useRefreshStore } =
  Requests;
const Router = useRouter();

//async states
let useAdd = ref(true);
let useClear = ref(false);
let useUpdate = ref(false);
let useQuiz = ref(false);
let usePeek = ref(false);

//template vars
let uploadSuccess = ref(false);
let allposts = ref(Array);
let usePost = ref(Array);
let message = ref(""); //stores return state of all request
let deleteConst = ref("");
let name = ref("");
let translation = ref("");
let genre = ref("");
let patchName = ref("");
let patchGenre = ref("");
let serverState = ref(null);
//request vars
let ok_fetch = ref(false);
let fail_fetch = ref(false);
let ok_upload = ref(false);
let ok_patch = ref(false);
let ok_delete = ref(false);
let fail_upload = ref(false);
let fail_patch = ref(false);
let fail_delete = ref(false);
let fail_server = ref(false);
//dynamic vars
let showForm1 = ref(false);
let showForm2 = ref(false);
let useDelete = ref(false);
let ok_class = ref("text-green-600");
let fail_class = ref("text-red-500");
//the two variables below should be defined in a store, {reusable across methods}
let serverLoading = ref(null);
let Loading = ref(null);
let Serve = ref(null);
//footer vars
let localLoading = ref(null);
let localLoaded = ref(null);
let cloudLoading = ref(null);
let cloudLoaded = ref(null);

//fetch data from idb on component mount.
onMounted(async () => {
  // await pushToCloud();
  // const p = await isOnline();
  // console.log(p);
});

//computed issues
//computed to render ok_class if serverState is true, and fail_class if serverState is false
const useState = computed(() => {
  if (serverState.value) {
    return ok_class.value;
  } else {
    return fail_class.value;
  }
});
watchEffect(() => {
  name.value = name.value.toLowerCase().trim();
  genre.value = genre.value.toLowerCase().trim();
  translation.value = translation.value.toLowerCase().trim();
});

//functions
async function getServerState() {
  returnState(serverLoading, serverState, fail_server);
  //todo: would be used to ensure connection is established before reqs or posts.
}
function refreshStore() {
  useRefreshStore(allposts, Router);
}

// getServerState();

async function fetchPost() {
  await fetchAllPost(ok_fetch, Serve, allposts, fail_fetch);
}
async function addPost() {
  try {
    const onlineState = await isOnline();
    onlineState
      ? (console.log("sending online"),
        await addNewPost(
          fail_upload,
          Loading,
          message,
          ok_upload,
          name.value,
          translation.value,
          genre.value,
          Router
        ))
      : console.log("Saving to IndexedDb"),
      await handleOffline(name.value, translation.value, genre.value);
  } catch (err) {
    //left for dev. purposes (localDB for storage.)
    switch (err.message) {
      case "Network Error":
        console.log("Saving to IndexedDb");
        await handleOffline(name.value, translation.value, genre.value);
        break;
      default:
        console.log("Network Error");
        break;
    }
  }
}
async function removePost() {
  await deletePost(
    fail_delete,
    Loading,
    deleteConst,
    message,
    ok_delete,
    unref,
    Router
  );
}
async function updateOnePost() {
  await patchPost(
    fail_patch,
    ok_patch,
    Loading,
    message,
    patchName,
    patchGenre,
    Router
  );
}
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
