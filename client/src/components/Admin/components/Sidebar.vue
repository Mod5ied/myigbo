<template>
  <div
    class="flex flex-col items-center justify-start w-1/5 h-full gap-8 py-16 border-r"
  >
    <button :to="{ name: 'AddWord' }" class="side_span">Add to library</button>
    <button :to="{ name: 'AddQuiz' }" class="side_span">Add a quiz</button>
    <button :to="{ name: 'UpdateWord' }" class="side_span">
      Update a word
    </button>
    <button :to="{ name: 'PeekWords' }" class="side_span">View library</button>
    <button :to="{ name: 'DeleteWord' }" class="side_span">
      Delete a word
    </button>
    <span class="side_span">
      <button @click="emergency = !emergency">Emergency config</button>
      <div class="absolute flex gap-8 p-2 left-4 bottom-5" v-if="emergency">
        <span><i></i> <button>Offline</button> </span>
        <span><i></i> <button>Cloud</button> </span>
        <span><i></i> <button>Clear Library</button> </span>
      </div>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emergency = ref(false);
</script>
