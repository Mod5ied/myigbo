<template>
	<div class="bottom_bar">
		<button @click="dispatch(Dispatch.add, true)" :class="useAdd ? 'side_span_active' : 'side_span'">
			<p class="bottom_bar_text">Add to library</p>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
				<path
					d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Add</p> -->
		</button>
		<button @click="dispatch(Dispatch.update, true)" :class="useUpdate ? 'side_span_active' : 'side_span'">
			<p class="bottom_bar_text">Update a word</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-5 h-5 text-emerald-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Update</p> -->
		</button>
		<button @click="dispatch(Dispatch.delete, true)" :class="useDelete ? 'side_span_active' : 'side_span'">
			<p class="bottom_bar_text">Delete a word</p>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Delete</p> -->
		</button>
		<button @click="dispatch(Dispatch.peek, true)" :class="usePeek ? 'side_span_active' : 'side_span'">
			<p class="bottom_bar_text">View library</p>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
				<path
					d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Preview</p> -->
		</button>
		<button @click="dispatch(Dispatch.audio, true)" :class="useAudio ? 'side_span_active' : 'side_span'">
			<p class="bottom_bar_text">Add Audio</p>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
					clip-rule="evenodd"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Quiz</p> -->
		</button>
    <div class="hidden md:block md:w-full md:border"></div>
		<span class="side_span" @click="dispatch(Dispatch.account, true)">
			<button class="bottom_bar_text">User Accounts</button>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 text-emerald-500"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			<!-- <p class="block text-xs md:hidden">Accounts</p> -->
		</span>
	</div>
</template>

<script setup>
	import { ref, inject } from "vue";

	//style states.
	let useAdd = ref(false);
	let useAudio = ref(false);
	let usePeek = ref(false);
	let useDelete = ref(false);
	let useUpdate = ref(false);
	let useAccount = ref(false);
	const emitter = inject("emitter");

	//dispatch states.
	const Dispatch = ref({
		add: "addWord",
		audio: "addAudio",
		account: "accountView",
		delete: "deleteWord",
		update: "updateWord",
		peek: "peekWords",
	});

	//fn to emit.
	const toggleView = (view, state, styleVar) => {
		emitter.emit(view, state); //👈emits view to toggle to Admin.
		styleVar.value = state;
	};

	function dispatch(action, state) {
		switch (action) {
			case "addWord":
				toggleView(action, state, useAdd);
				useAudio.value = false;
				usePeek.value = false;
				useDelete.value = false;
				useUpdate.value = false;
				break;
			case "addAudio":
				toggleView(action, state, useAudio);
				useAdd.value = false;
				usePeek.value = false;
				useDelete.value = false;
				useUpdate.value = false;
				break;
			case "updateWord":
				toggleView(action, state, useUpdate);
				useAdd.value = false;
				useAudio.value = false;
				usePeek.value = false;
				useDelete.value = false;
				break;
			case "deleteWord":
				toggleView(action, state, useDelete);
				useAdd.value = false;
				useAudio.value = false;
				usePeek.value = false;
				useUpdate.value = false;
				break;
			case "peekWords":
				toggleView(action, state, usePeek);
				useAdd.value = false;
				useAudio.value = false;
				useDelete.value = false;
				useUpdate.value = false;
				break;
			case "accountView":
				toggleView(action, state, useAccount);
				useAdd.value = false;
				useAudio.value = false;
				useDelete.value = false;
				useUpdate.value = false;
				break;
			default:
				break;
		}
	}
</script>