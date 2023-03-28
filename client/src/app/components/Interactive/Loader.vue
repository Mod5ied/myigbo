<template>
	<div
		v-if="!showLoader"
		class="flex flex-col items-center justify-center h-screen overflow-hidden overflow-x-hidden bg-gray-100 dark:bg-slate-900 font-body"
	>
		<main class="flex flex-col items-center justify-center gap-4">
			<h1 class="flex flex-row text-5xl font-bold text-slate-900 dark:text-slate-200">
				IGBO LIBRARY
				<p class="text-red-500">.</p>
			</h1>
			<span>
				<vue-loaders name="ball-pulse" color="#135bbf" scale="0.8"></vue-loaders>
			</span>
		</main>
		<!-- DON"T REMOVE -->
		<!-- <span>
            <p class="absolute font-medium right-10 bottom-5 font-body text-slate-500 dark:text-slate-400">By DigiAfrique</p>
        </span> -->
	</div>
</template>

<script setup>
	import { onMounted, inject } from "vue";
	import { useRouter } from "vue-router";

	const emitter = inject("emitter");
	const router = useRouter();
	const props = defineProps({
		location: String,
		showLoader: Boolean,
	});

	function redirectToLogin() {
		setTimeout(() => {
			router.push({ name: "Register" });
		}, 8000);
	}

	function hideLoaderPage() {
		setTimeout(() => {
			emitter.emit("hide-loader");
		}, 5000);
	}

	onMounted(() => {
		if (props.location === undefined || !props.location) {
			redirectToLogin();
			return;
		} else {
			hideLoaderPage();
		}
	});
</script>
