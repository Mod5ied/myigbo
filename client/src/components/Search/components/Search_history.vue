<template>
  <div
    class="relative flex flex-row items-center justify-center gap-2 cursor-pointer hover:text-indigo-700 top-5 md:-top-5"
  >
    <h3 class="text-sm font-medium text-gray-500 hover:text-indigo-700">
      Show History
    </h3>
    <i class="flex items-center text-gray-500 hover:text-indigo-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </i>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped></style>
