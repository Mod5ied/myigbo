<script setup>
import { inject, onBeforeMount, onMounted, ref } from "vue";
let parentDiv = ref(null);
let currentState = ref(null);
//parent element reference.
onMounted(() => {
  parentDiv.value = document.getElementById("parent");
});

//define our emitter here.
const emitter = inject("emitter");

//dynamic states
let local_state = ref(null);

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
    //not certain 👇
    // case "light":
    //   parentDiv.value.classList.remove("dark");
    //   break;

    default:
      parentDiv.value.classList.remove("dark");
      break;
  }
}
onMounted(() => {
  persistState();
});

//emitters that sets payload to localStorage database on emission of event.
//dark-mode.
emitter.on("set-dark", (payload) => {
  //write "dark" to localstorage.
  localStorage.setItem("state", payload);
  parentDiv.value.classList.add(payload);
});
//light-mode.
emitter.on("set-light", (payload) => {
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
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;700&display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
