<template>
  <header
    class="flex flex-row items-center justify-between w-full px-6 border-b border-gray-200 md:px-12 h-14 dark:border dark:border-slate-800 bg-gray-50 dark:bg-slate-900 font-body"
  >
    <section id="left">
      <h1 class="text-lg font-semibold dark:text-slate-300">
        IgboTrans Library
      </h1>
    </section>
    <div id="right" class="admin_header_right">
      <router-link class="search-links" :to="{ name: 'Search' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Home</router-link
      >
      <router-link class="search-links" :to="{ name: 'Dictionary' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Dictionary</router-link
      >
      <router-link class="search-links" to="">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
        About</router-link>
      <!-- <section class="flex items-center h-full">
        <span
          class="flex flex-row justify-around gap-1 px-2 text-sm text-gray-600 cursor-pointer dark:text-slate-300 font-body"
        >
          <p>Server-status</p>
          <i
            class="flex items-center"
            :class="serverState ? ok_class : fail_class"
            v-if="serverState"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </i>
          <i class="flex items-center" v-if="fail_server">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="fail_class"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </span>
      </section> -->
    </div>
    <div class="md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import isOnline from "is-online";
import { Utilities } from "../../../scripts/Services";
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
    serverState.value = await isOnline();
    fail_server.value = !serverState.value ? false : true;
  } catch (err) {
    return err;
  }
})();
</script>
