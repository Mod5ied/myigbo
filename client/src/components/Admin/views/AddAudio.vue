<template>
	<div class="flex flex-col items-center absolute z-20 w-full h-full gap-6 p-4 md:w-1/2 font-body">
		<span
			class="flex justify-between w-full overflow-hidden text-sm bg-slate-300 dark:bg-slate-700 rounded-md md:w-3/4 mt-14">
			<button @click="formsToggle('showSearch')" class="w-1/2 px-6 font-bold text-gray-100 bg-yellow-500">
				Search Audio
			</button>
			<button @click="formsToggle('showDict')" class="w-1/2 p-2 font-bold text-gray-50">
				Dictionary Audio
			</button>
		</span>
		<!-- searchQuiz form 👇 -->
		<form @submit.prevent="submitQuiz('search')"
			class="flex flex-col justify-around w-full gap-3 p-6 border rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-slate-700 h-3/4"
			v-if="useSearch">
			<p class="m-auto text-red-500">Coming soon...</p>
		</form>
		<!-- dictionaryQuiz form 👇 -->
		<form @submit.prevent="submitQuiz('dict')"
			class="flex flex-col justify-around w-full gap-3 p-6 border rounded-lg bg-gray-50 h-4/5 md:h-3/4 dark:bg-slate-900 dark:border-slate-600"
			v-if="useDict">
			<p class="m-auto text-red-500">Coming soon...</p>
		</form>
	</div>
</template>

<script setup>
import { ref} from "vue";

// //input states.
// let question = ref("");
// let right_answer = ref("");
// let wrong_answer = ref("");
// let wrong_answer2 = ref("");

// watchEffect(() => {
// 	// question.value = question.value.toLowerCase();
// 	// right_answer.value = right_answer.value.toLowerCase();
// 	// wrong_answer.value = wrong_answer.value.toLowerCase();
// 	// wrong_answer2.value = wrong_answer2.value.toLowerCase();
// });

//forms states.
let useSearch = ref(false);
let useDict = ref(false);

//submit states.
const ok_class = ref("text-green-600");
const fail_class = ref("text-red-500");
let fail_upload = ref(false);
let ok_upload = ref(false);
let errMessage = ref("");
let loading = ref(false);

//dict submit handler.
// const handleDict = async (model = "") => {
// 	return await addNewQuiz(
// 		model,
// 		fail_upload,
// 		loading,
// 		ok_upload,
// 		question.value,
// 		right_answer.value,
// 		wrong_answer.value,
// 		wrong_answer2.value
// 	);
// };

//search submit handler.
// const handleWords = async (model = "") => {
// 	return await addNewQuiz(
// 		model,
// 		fail_upload,
// 		loading,
// 		ok_upload,
// 		question.value,
// 		right_answer.value,
// 		wrong_answer.value
// 	);
// };

//fn to submit the forms.
// const submitQuiz = async (quizType) => {
// 	switch (quizType) {
// 		case "search":
// 			return handleWords("search")
// 				.then()
// 				.catch((err) => (errMessage.value = err));
// 		// send to err handler and notify admin.
// 		case "dict":
// 			return handleDict("dict")
// 				.then()
// 				.catch((err) => (errMessage.value = err));
// 		// send to err handler and notify admin.
// 		default:
// 			return (errMessage.value = "An unknown error occurred");
// 		// send to err handler and notify admin (An unknown error occurred).
// 	}
// };

//fn to toggle forms views.
const formsToggle = (state) => {
	switch (state) {
		case "showDict":
			return (useDict.value = !useDict.value), (useSearch.value = false);
		case "showSearch":
			return (useSearch.value = !useSearch.value), (useDict.value = false);
		default:
			return (useSearch.value = false), (useDict.value = false);
	}
};

// function flashError() {
// 	useError.value = true;
// 	setTimeout(() => {
// 		useError.value = false;
// 	}, 3000);
// }
</script>
