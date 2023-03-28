<template>
	<header
		class="flex flex-row justify-between w-full px-3 py-5 list-none border-b h-14 dark:border-b-gray-800 md:px-5 dark:bg-slate-900 bg-gray-50"
	>
		<span class="flex items-center w-full gap-8 text-gray-500 md:w-8 md:relative md:left-10">
			<i class="flex justify-between w-full cursor-pointer md:items-center">
				<!-- hamburger menu. -->
				<svg
					@click="useMenu = !useMenu"
					xmlns="http://www.w3.org/2000/svg"
					class="w-6 h-6 text-slate-700 dark:text-slate-300 md:hidden"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
				<!-- light/dark toggle. -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					:class="!darkState ? 'lightMode' : 'darkMode'"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					@click="emit('togglTheme')"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			</i>
		</span>
		<Header_links display="headerDropdown" :title="Props.title" v-if="useMenu" />
		<Header_links display="headerLinks" :account-name="Props.accountState" :title="Props.title" />
	</header>
</template>

<script setup>
	import { ref } from "vue";
	import Header_links from "./helpers/header_links.vue";

	const Props = defineProps({
		darkState: {
			type: Boolean,
			default: false,
		},
		title: String,
		accountState: String,
	});
	const emit = defineEmits(["togglTheme"]);

	let useMenu = ref(false);
	// let title = ref(Props.title);

</script>
<style scoped>
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.3s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
