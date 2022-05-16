<template>
  <header
    class="flex flex-row items-center justify-between w-full px-12 py-3 border-b border-gray-200 font-body"
  >
    <section id="left">
      <h1 class="text-lg font-semibold">IgboTrans Library</h1>
    </section>
    <div id="right" class="flex items-center justify-between w-1/3">
      <section class="flex">
        <span
          class="flex flex-row justify-around gap-1 px-2 text-sm text-gray-600 cursor-pointer font-body hover:bg-slate-600"
        >
          <p>Server status</p>
          <!-- success with server -->
          <i class="flex items-center" :class="useState" v-if="serverState">
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
          <!-- loading server state (spinner)-->
          <i class="flex items-center" v-if="serverLoading">
            <svg
              role="status"
              class="w-3 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          </i>
          <!-- failed state -->
          <i class="flex items-center" v-if="!fail_server">
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
      <section class="flex items-center gap-4 text-sm">
        <router-link :to="{ name: 'Search' }">Home</router-link>
        <router-link to="">About</router-link>
        <router-link to="">*Future</router-link>
      </section>
      <section class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-orange-400 md:w-20 hover:text-orange-300 dark:text-orange-500 dark:hover:text-orange-300"
          viewBox="0 0 20 20"
          fill="currentColor"
          v-if="!darkState"
          @click="setDarkMode"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </section>
      <section>
        <ul>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
        </ul>
      </section>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

let serverState = ref(false);
let serverLoading = ref(false);
let fail_server = ref("");
let fail_class = ref("");
let darkState = ref(false);

const setDarkMode = () => {};
</script>
