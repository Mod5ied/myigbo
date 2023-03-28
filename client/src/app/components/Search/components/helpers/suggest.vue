<template>
	<div class="flex flex-col items-center">
		<h3 class="text-center text-slate-500 dark:text-slate-200">Word not found. Did you mean:</h3>
		<span>
			<li @click="emitRequest(words)" v-for="words in suggestArray" class="text-blue-500 dark:text-slate-200">{{ words }}</li>
		</span>
	</div>
</template>

<script setup>
	import { onBeforeMount, inject, ref } from "vue";
	import { predictSuggestion } from "../../../../../services/record.service";

	let suggestArray = ref([]);
	let userInput = ref(Props.inputData);
	
	const emitter = inject("emitter");
	const Props = defineProps({
		inputData: String,
	});
	const emitRequest = (word) => {
		emitter.emit("suggest-english-request", word);
		setTimeout(() => {
			emitter.emit("hide-suggest-box");
		}, 300);
	};

	/* TO WORK ON THIS... */
	// const emitRequest = (word, category) => {
	// 	switch (category) {
	// 		case 'english':
	// 			emitter.on("suggest-english-request", word);
	// 			break;
	// 		case 'igbo':
	// 			emitter.on("suggest-igbo-request", word);
	// 			break;
	// 	}
	// };


	onBeforeMount(async () => {
		suggestArray.value = await predictSuggestion(userInput.value, "search");
	});
</script>
