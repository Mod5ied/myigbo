<script setup>
import { delMany } from "idb-keyval";
import { inject, onMounted, ref } from "vue";
const emitter = inject("emitter");

let parentDiv = ref(null);
let currentState = ref(null);


//fn that checks the localstorage for state changes & assigns to var.
const checkStorage = () => {
  const state = localStorage.getItem("state");
  return state;
};
currentState.value = checkStorage();

//fn that persists either state based on {currentState} value.
const persistState = () => {
  switch (currentState.value) {
    case "dark":
      parentDiv.value.classList.add("dark");
      break;
    default:
      parentDiv.value.classList.remove("dark");
      break;
  }
};

const timeInMilSecs = (ms = 1) => {
  return ms * 60 * 24
}
const wipeHistories = async () => {
  /* wipes history after 24-hrs */
  setTimeout(async () => {
    await delMany(["englishHistories", "igboHistories"])
  }, timeInMilSecs(1000))
}

//emitters that sets payload to localStorage database on emission of event.
//dark-mode.
emitter.on("set-theme", (payload) => {
  //write "dark" to localstorage.
  if (payload === "dark") {
    localStorage.setItem("state", payload);
    parentDiv.value.classList.add(payload);
    return
  }
  //write "light" to localstorage.
  localStorage.setItem("state", payload);
  parentDiv.value.classList.remove("dark");
});

//parent element reference.
onMounted(() => {
  parentDiv.value = document.getElementById("parent");
  persistState();
  wipeHistories();
});
</script>

<template>
  <div id="parent">
    <router-view />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
