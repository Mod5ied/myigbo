<template>
  <div class="input-history-cover" v-if="showHistory">
    <ul class="history-list-cover">
      <li class="history-list" v-for="obj in existingHistories" v-text="obj" @click="appendToSearch(obj)"></li>
    </ul>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect } from "vue";
import { getMany } from "idb-keyval"

let existingHistories = ref([]);
const emitter = inject("emitter");
const Props = defineProps({
  placeHolder: String,
  showHistory: {
    type: Boolean,
    default: false
  }
})
let showHistory = ref(Props.showHistory)
let placeHolder = ref(Props.placeHolder)

const appendToSearch = (value) => {
  emitter.emit("append-to-search", value)
  setTimeout(() => { emitter.emit("hide-history") }, 300)
}
const fetchHistory = async () => {
  return await getMany(["englishHistories", "igboHistories"])
}
const matchArrayToPlaceHolder = (histories, placeholder) => {
  switch (placeholder) {
    case "Translate Igbo words":
      console.log("igbo", histories[1]);
      existingHistories.value = histories[1].reverse(); //i f.ing did it. Histories now shows up from most recent.
      break;
    case "Translate English words":
      console.log("english", histories[0]);
      existingHistories.value = histories[0].reverse(); //i f.ing did it. Histories now shows up from most recent.
      break;
  }
}

watchEffect(async () => {
  placeHolder.value = matchArrayToPlaceHolder(await fetchHistory(), placeHolder.value);
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
