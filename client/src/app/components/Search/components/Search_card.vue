<template>
	<div class="flex flex-col justify-center w-full p-3 rounded-md shadow-lg bg-cyan-600 dark:bg-slate-700 md:w-1/3">
		<div>
			<span class="flex flex-row justify-between px-4 py-2">
				<h3 class="text-2xl font-bold text-gray-100 dark:text-slate-300">
					{{ userRecord.name }}
				</h3>
				<i
					title="Listen"
					class="flex items-center p-2 transition bg-red-400 rounded-md cursor-pointer hover:bg-red-500 hover:duration-300 hover:scale-105"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
							clip-rule="evenodd"
						/>
					</svg>
				</i>
			</span>
			<span class="flex items-center justify-start gap-4 px-4 py-2 text-sm text-slate-100 dark:text-slate-300">
				<p class="text-red-500">Word Category</p>
				<p>[{{ userRecord.genre }}]</p>
			</span>
			<p class="px-4 py-2 text-sm font-medium text-slate-200 dark:text-slate-300">
				{{ userRecord.translation }}
			</p>
		</div>
	</div>
</template>

<script setup>
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
	});

	//reactive template states.
	let userRecord = props?.useRecord;
</script>
