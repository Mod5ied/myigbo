<template>
  <header
    class="flex flex-row items-center justify-between w-full px-6 border-b border-gray-200 md:px-12 h-14 dark:border dark:border-slate-800 bg-gray-50 dark:bg-slate-900 font-body">
    <section id="left">
      <h1 class="flex items-center text-xl font-semibold dark:text-slate-300">
        Igbo Library <p class="text-3xl text-red-600">.</p>
      </h1>
    </section>
    <div id="right" class="admin_header_right">
      <router-link class="search-links" :to="{ name: 'Dictionary' }">
        Dictionary
      </router-link>
      <router-link class="search-links" :to="{ name: 'Learn' }">
        Learn Igbo
      </router-link>
      <router-link class="search-links" :to="{ name: 'Search' }">
        Search Words
      </router-link>
    </div>
    <div class="md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import isOnline from "is-online";
import { Utilities } from "../../../proxy/Services";
const { returnState } = Utilities;

let darkState = ref(false);
let fail_server = ref(null);
let serverState = ref(null);

//style states.
const ok_class = ref("text-green-600");
const fail_class = ref("text-red-500");

//functions
(async function getServerState() {
  try {
    // serverState.value = await isOnline();  /* REMOVE THIS SOON */
    fail_server.value = !serverState.value ? false : true;
  } catch (err) {
    return err;
  }
})();
</script>
