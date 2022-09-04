<template>
	<div class="flex flex-col items-center absolute w-full h-full gap-6 p-4 md:w-1/2 font-body z-20">
		<!-- Selection tabs. -->
		<span
			class="flex justify-between w-full mt-0 overflow-hidden text-sm rounded-md bg-slate-300 dark:bg-slate-700 md:w-4/5 md:mt-14">
			<div v-if="dropDownRecords" class="use_dropdown_peek_left">
				<button @click="dispatch('allWords')" class="use_buttons" title="Selects to load all search words">
					Words
				</button>
				<button @click="dispatch('allRecords')"
					class="border-t use_buttons border-slate-500 dark:border-slate-400"
					title="Selects to load all dictionary words">
					Dictionary
				</button>
			</div>
			<div @click="dropDownRecords = !dropDownRecords" class="peek_dropdown"
				title="Selects the record category to update">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-700 dark:hover:text-blue-500"
					fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			<!-- left-btn ADD-RECORDS -->
			<button @click="formsToggle('showTrans')" class="w-1/2 px-4 font-bold text-gray-100 bg-blue-500">
				Add to Record
			</button>
			<!-- right-btn ADD-QUIZZES -->
			<button @click="formsToggle('showDict')" class="w-1/2 p-2 font-bold text-gray-50 bg-slate-500">
				Add to Quiz
			</button>
			<div @click="dropDownQuizzes = !dropDownQuizzes" class="peek_dropdown"
				title="Selects the quiz category to view">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-700 dark:hover:text-blue-500"
					fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			<div v-if="dropDownQuizzes" class="use_dropdown_peek_right">
				<button @click="dispatch('search')" class="use_buttons" title="Selects to load search page quizzes">
					SearchPage
				</button>
				<button @click="dispatch('dict')" class="border-t use_buttons border-slate-500 dark:border-slate-400"
					title="Selects to load dictionary page quizzes">
					DictPage
				</button>
			</div>
		</span>
		<!-- forms below 👇 -->
		<UploadWords v-if="useWords" />

		<UploadQuizzes v-if="useQuiz" />
	</div>
</template>

<script setup>
import { inject, ref } from "vue";
import UploadQuizzes from "../components/forms/uploadQuizzes.vue";
import UploadWords from "../components/forms/uploadWords.vue";
const emitter = inject("emitter")

let useQuiz = ref(false);
let useWords = ref(false);

// let quizConstant = ref("");
let dropDownRecords = ref(false);
let dropDownQuizzes = ref(false);


//fn to toggle forms views.
const formsToggle = (state) => {
	switch (state) {
		case "showDict":
			return (useQuiz.value = !useQuiz.value), (useWords.value = false);
		case "showTrans":
			return (useWords.value = !useWords.value), (useQuiz.value = false);
		default:
			return (useWords.value = false), (useQuiz.value = false);
	}
};

function dispatch(factor) {
	switch (factor) {
		case "allWords":
			emitter.emit(factor, "word");
			return (dropDownRecords.value = false);
		case "allRecords":
			emitter.emit(factor, "dict");
			return (dropDownRecords.value = false);
		case "search":
			emitter.emit(factor, "search");
			return (dropDownQuizzes.value = false);
		case "dict":
			emitter.emit(factor, "dict");
			return (dropDownQuizzes.value = false);
		default:
			break;
	}
}
</script>