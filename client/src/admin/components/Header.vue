<template>
  <header
    class="flex flex-row items-center justify-between w-full h-16 px-6 border-b border-gray-200 md:px-12 dark:border dark:border-slate-800 bg-gray-50 dark:bg-slate-900 font-body">
    <section id="left">
      <router-link :to="{name: 'Search'}" class="flex items-center text-xl font-semibold dark:text-slate-300">
        Igbo Library <p class="text-3xl text-red-600">.</p>
    </router-link>
    </section>
    <header_links display="headerAdminLink"  />
    <!-- <header_links display="headerAdminDropdown" v-if="useMenu" /> -->
  </header>
</template>

<script setup>
import { ref } from "vue";
import header_links from "./helpers/header_links.vue";
let useMenu = ref(false);
</script>