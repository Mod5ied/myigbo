<template>
  <div>
    <h3 v-if="hasError" class="text-slate-500 dark:text-slate-200">
      Something went wrong
    </h3>
    <slot v-else></slot>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";

let hasError = ref(false);
onErrorCaptured(() => {
  hasError.value = true;
});
</script>

<style lang="scss" scoped></style>
