<template>
  <div
    class="flex flex-col items-center w-1/2 h-full gap-6 p-4 mr-40 font-body"
  >
    <span
      class="flex justify-between w-1/2 overflow-hidden rounded-md bg-slate-300"
    >
      <button
        @click="formsToggle('showGenre')"
        class="w-full p-2 text-sm font-bold text-gray-100 bg-emerald-500"
      >
        View Words
      </button>
      <!--  -->
      <!-- <button
        @click="formsToggle('showTrans')"
        class="w-1/2 p-2 text-sm font-bold text-gray-50"
      >
        Update translations
      </button> -->
    </span>
  </div>
</template>

<script setup></script>
