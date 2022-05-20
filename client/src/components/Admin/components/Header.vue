<template>
  <header
    class="flex flex-row items-center justify-between w-full px-12 border-b border-gray-200 h-14 dark:border dark:border-slate-800 bg-gray-50 dark:bg-slate-900 font-body"
  >
    <section id="left">
      <h1 class="text-lg font-semibold dark:text-slate-300">
        IgboTrans Library
      </h1>
    </section>
    <div id="right" class="flex items-center justify-between w-1/3 h-full">
      <section
        class="flex items-center h-full gap-10 px-1 text-sm dark:text-slate-300"
      >
        <router-link class="search-links" :to="{ name: 'Search' }"
          >Home</router-link
        >
        <router-link class="search-links" to="">About</router-link>
        <router-link class="search-links" to="">*Future</router-link>
      </section>
      <section class="flex items-center h-full">
        <span
          class="flex flex-row justify-around gap-1 px-2 text-sm text-gray-600 cursor-pointer dark:text-slate-300 font-body"
        >
          <p>Server-status</p>
          <!-- success with server -->
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
          <!-- failed state -->
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
      </section>
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
