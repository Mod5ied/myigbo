<template>
	<!-- dictionaryQuiz form 👇 -->
	<form @submit.prevent="handleSubmit(quizConstant)" class="adminForms bg-gray-50">
		<div class="uploadWordSpans">
			<label for="english" class="text-sm font-semibold">Quiz question</label>
			<input
				@focusin="(fail_upload = false), (ok_upload = false), (useError = false)"
				type="text"
				id="english"
				name="english"
				placeholder="Enter the question"
				required
				v-model="question"
				class="dark_inputs"
			/>
		</div>
		<div class="uploadWordSpans">
			<label for="igbo" class="text-sm font-semibold"> Right answer </label>
			<input
				@change="fail_upload = false"
				type="text"
				id="igbo"
				name="igbo"
				placeholder="Enter the answer"
				required
				v-model="right_answer"
				class="dark_inputs"
			/>
		</div>
		<div class="uploadWordSpans">
			<label for="igbo" class="text-sm font-semibold"> Wrong answer1 </label>
			<input
				@change="fail_upload = false"
				type="text"
				id="igbo"
				name="igbo"
				placeholder="Enter wrong answer"
				required
				v-model="wrong_answer"
				class="dark_inputs"
			/>
		</div>
		<div class="uploadWordSpans">
			<label for="igbo" class="flex items-center gap-2 text-sm font-semibold">
				Wrong answer2
				<transition>
					<svg
						v-if="quizConstant == 'search'"
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-6 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</transition>
			</label>
			<input
				@change="fail_upload = false"
				type="text"
				id="igbo"
				name="igbo"
				:disabled="quizConstant == 'search'"
				:placeholder="quizConstant == 'search' ? 'not required' : 'Enter another wrong answer'"
				v-model="wrong_answer2"
				class="dark_inputs"
			/>
		</div>
		<!-- submitting section 👇 -->
		<span class="flex flex-row items-center w-11/12 gap-2 p-2 text-right md:w-4/5">
			<button
				class="sub-btns bg-emerald-600 hover:bg-emerald-500 dark:text-slate-100 dark:hover:text-slate-200 text-slate-100 hover:shadow-md"
			>
				Upload quiz
				<!-- loading state -->
				<i class="flex items-center" v-if="loading">
					<svg
						role="status"
						class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						></path>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						></path>
					</svg>
				</i>
				<!-- loaded state -->
				<i class="flex flex-row items-center" v-if="ok_upload">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" :class="ok_class">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				</i>
				<!-- failed state-->
				<i class="flex flex-row items-center" v-if="fail_upload">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" :class="fail_class">
						<path
							fill-rule="evenodd"
							d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</i>
			</button>
		</span>
		<span class="mx-auto" v-if="useError">
			<p class="text-sm text-red-400">{{ errMessage }}</p>
		</span>
	</form>
</template>

<script setup>
	import { Requests, OfflineStorage } from "../../../proxy/Services";
	import { ref, watchEffect, inject } from "vue";
	import isOnline from "is-online";
	const { handleOffline } = OfflineStorage;
	const { addNewQuiz } = Requests;
	const emitter = inject("emitter");
	let currentUser = inject("currentUser");

	//submit states.
	const ok_class = ref("text-green-600");
	const fail_class = ref("text-red-500");
	let fail_upload = ref(false);
	let ok_upload = ref(false);
	let loading = ref(false);
	let useError = ref(false);
	let errMessage = ref("");
	let quizConstant = ref("");

	let question = ref("");
	let right_answer = ref("");
	let wrong_answer = ref("");
	let wrong_answer2 = ref("");

	//watcher to smallint user-input
	watchEffect(() => {
		right_answer.value = right_answer.value.toLowerCase();
		wrong_answer.value = wrong_answer.value.toLowerCase();
		wrong_answer2.value = wrong_answer2.value.toLowerCase();
	});

	emitter.on("search", (payload) => (quizConstant.value = payload));
	emitter.on("dict", (payload) => (quizConstant.value = payload));

	async function runSubmit(quizConstant, state) {
		switch (quizConstant) {
			case "search":
				if (!state)
					return addNewQuiz(
						quizConstant,
						fail_upload,
						loading,
						ok_upload,
						errMessage.value,
						question.value,
						right_answer.value,
						wrong_answer.value,
            currentUser?.user?.token
					)
						.then((res) => (useError.value = false))
						.catch((err) => (useError.value = true));
				return handleOffline(question.value, right_answer.value, wrong_answer.value)
					.then((res) => (useError.value = false))
					.catch((err) => (useError.value = true));
			case "dict":
				if (!state)
					return addNewQuiz(
						quizConstant,
						fail_upload,
						loading,
						errMessage.value,
						ok_upload,
						question.value,
						right_answer.value,
						wrong_answer.value,
						wrong_answer2.value,
            currentUser?.user?.token
					)
						.then((res) => (useError.value = false))
						.catch((err) => (useError.value = true));
				return handleOffline(question.value, right_answer.value, wrong_answer.value, wrong_answer2.value)
					.then((res) => (useError.value = false))
					.catch((err) => (useError.value = true));
			default:
				return flashError("Unknown Operation");
		}
	}

	async function handleSubmit(factor) {
		const onlineState = await isOnline();
		if (factor) {
			switch (factor) {
				case "search":
					return await runSubmit(factor, onlineState);
				case "dict":
					return await runSubmit(factor, onlineState);
				default:
					return flashError("Unknown Operation");
			}
		}
		return flashError("Select the category!");
	}

	function flashError(err) {
		errMessage.value = err;
		useError.value = true;
		setTimeout(() => {
			useError.value = false;
		}, 3000);
	}
</script>
