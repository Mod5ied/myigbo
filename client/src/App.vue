<script setup>
import { inject, onMounted, ref } from "vue";
const emitter = inject("emitter");

let parentDiv = ref(null);
let currentState = ref(null);

//parent element reference.
onMounted(() => {
  parentDiv.value = document.getElementById("parent");
  persistState();
});

//fn that checks the localstorage for state changes & assigns to var.
function checkStorage() {
  const state = localStorage.getItem("state");
  return state;
}
currentState.value = checkStorage();

//fn that persists either state based on {currentState} value.
function persistState() {
  switch (currentState.value) {
    case "dark":
      parentDiv.value.classList.add("dark");
      break;
    default:
      parentDiv.value.classList.remove("dark");
      break;
  }
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
  console.log(payload);
  //write "light" to localstorage.
  localStorage.setItem("state", payload);
  parentDiv.value.classList.remove("dark");
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
