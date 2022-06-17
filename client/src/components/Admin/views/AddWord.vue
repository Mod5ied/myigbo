<template>
  <div
    class="flex flex-col items-center w-full h-full gap-6 p-4 mr-0 md:w-1/2 md:mr-40 font-body"
  >
    <span
      class="flex justify-between w-full overflow-hidden text-sm bg-blue-300 rounded-md md:w-3/4 mt-14"
    >
      <button
        @click="formsToggle('showTrans')"
        class="w-1/2 px-6 font-bold text-gray-100 bg-blue-500"
      >
        Translations
      </button>
      <button
        @click="formsToggle('showDict')"
        class="w-1/2 p-2 font-bold text-gray-50"
      >
        Dictionary
      </button>
    </span>
    <!-- forms below 👇 -->
    <UploadWords v-if="useTrans" />

    <UploadRecords v-if="useDict" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import UploadRecords from "../components/forms/uploadRecords.vue";
import UploadWords from "../components/forms/uploadWords.vue";

let useDict = ref(false);
let useTrans = ref(false);

//fn to toggle forms views.
const formsToggle = (state) => {
  switch (state) {
    case "showDict":
      useDict.value = !useDict.value;
      useTrans.value = false;
      break;
    case "showTrans":
      useTrans.value = !useTrans.value;
      useDict.value = false;
      break;

    default:
      useTrans.value = false;
      useDict.value = false;
      break;
  }
};
</script>
