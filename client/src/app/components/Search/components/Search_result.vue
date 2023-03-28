<template>
	<div class="w-screen">
		<div id="blur" class="absolute top-0 w-full dark:opacity-95 dark:bg-slate-900 bg-slate-100 opacity-90 md:opacity-95 h-4/5"></div>
		<div id="unblur" class="absolute flex flex-col w-full gap-12 px-4 -mt-64 md:place-items-center md:-mt-96">
			<span class="flex flex-col items-center justify-center gap-">
				<h2 class="text-2xl font-semibold select-none text-cyan-600 dark:text-white">Practice More 📢</h2>
				<p class="text-base font-medium text-center text-gray-500 select-none dark:text-slate-400 md:w-4/5">
					Build your vocabulary with new words and definitions every day of the week with our interactive practice sessions!
				</p>
			</span>
			<Suggest v-if="useError" class="error-card" :input-data="useInputData" />
			<Search_card v-else :use-record="$props.useRecord" />
		</div>
	</div>
</template>

<script setup>
	import { ref, inject, onMounted, watchEffect } from "vue";
	import { ErrorStates } from "../../../../proxy/ErrorScript";
	import Suggest from "./helpers/suggest.vue";
	import Search_card from "./Search_card.vue";

	const { errorMatcher } = ErrorStates;
	const emitter = inject("emitter");
	const props = defineProps({
		useRecord: {
			type: Object,
			default() {
				return {
					name: "",
					translation: "",
					genre: "",
				};
			},
		},
		passError: {
			type: Boolean,
			default: false,
		},
		passErrorCode: {
			type: Number,
			default: 0,
		},
		passInputData: String,
	});

	//reactive states for nested components.
	let errorState = ref("Error occurred");
	let useError = ref(props?.passError);
	let useInputData = ref(props?.passInputData);

	//emit from {Search-box}.
	emitter.on("hide-card", (payload) => {
		isSearching.value = payload;
	});
	emitter.on("hide-suggest-box", () => {
		useError.value = false;
	});

	function handleError() {
		if (useError === true) {
			errorMatcher(props.passErrorCode, errorState);
			return;
		}
	}

	watchEffect(() => {
		// if (props.passError === true) return emitter.emit("hide-puzzle")
	});
	onMounted(() => {
		handleError();
	});
</script>
