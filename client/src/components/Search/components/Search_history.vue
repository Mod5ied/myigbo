<template>
  <div class="input-history-cover" v-if="showHistory">
    <ul class="history-list-cover" v-for="(obj) in existingHistories">
      <li class="history-list" v-for="str of obj" v-text="str" @click="appendToSearch(str)"></li>
    </ul>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { getMany } from "idb-keyval"

/* should fetch data from localStorage and populate the UI */
let existingHistories = ref([]);
const emitter = inject("emitter");
const Props = defineProps({
  showHistory: {
    type: Boolean,
    default: false
  }
})
let showHistory = ref(Props.showHistory)

const appendToSearch = (value) => {
  emitter.emit("append-to-search", value)
  setTimeout(() => { emitter.emit("hide-history") }, 300)
}
const fetchHistory = async () => {
  existingHistories.value = await getMany(["englishHistories", "igboHistories"])
}

onMounted(async () => {
  await fetchHistory()
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition: opacity 0.1s ease;
}
</style>
