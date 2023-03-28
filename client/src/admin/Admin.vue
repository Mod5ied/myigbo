<template>
	<Transition>
		<Loader location="nil" :show-loader="showLoader" class="absolute z-30 w-full h-full opacity-90 dark:opacity-75" />
	</Transition>
	<div id="home" class="flex flex-col items-center justify-start overflow-x-hidden bg-gray-100 select-none dark:bg-slate-800">
		<Header />
		<!-- loader screen -->
		<div class="flex w-screen h-screen" id="main">
			<aside class="hidden md:w-40 md:flex">
				<Sidebar />
			</aside>
			<main class="flex justify-center w-full overflow-x-hidden">
				<!-- error pop-out. -->
				<Transition>
					<div v-if="useError" class="error-card">
						<div>
							<h3 class="text-center text-slate-500 dark:text-slate-200">
								{{ errorState }}
							</h3>
						</div>
					</div>
				</Transition>
				<!-- notification pop-out. -->
				<Transition>
					<div
						v-if="useSync"
						:class="
							syncOk
								? 'border-emerald-500 dark:border-emerald-700 sync-card'
								: 'border-yellow-500 sync-card dark:border-yellow-600'
						"
					>
						<div>
							<p
								class="flex items-center gap-2 text-sm font-semibold text-center font-body text-slate-500 dark:text-slate-200"
							>
								{{ syncMessage }}
								<svg
									v-if="!syncOk"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-5 h-5 text-yellow-600"
								>
									<path
										fill-rule="evenodd"
										d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									v-if="syncOk"
									xmlns="http://www.w3.org/2000/svg"
									class="w-4 h-4 fill-green-600"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
							</p>
						</div>
					</div>
				</Transition>
				<AddWord v-if="useAdd" />
				<AddAudio v-if="useAudio" />
				<DeleteWord v-if="useClear" />
				<UpdateWord v-if="useUpdate" />
				<PeekWords v-if="usePeek" />
				<Users v-if="useAccount" />
				<Transition>
					<img src="../app/assets/home.svg" class="relative z-10 w-2/3 md:w-2/5 bottom-32 opacity-30" alt="lets-learn" />
				</Transition>
			</main>
		</div>
		<Sidebar />
	</div>
</template>
<script setup>
	import { ref, inject, defineAsyncComponent, provide } from "vue";
	import { OfflineStorage } from "../proxy/Services";
	import Header from "./components/Header.vue";
	import Sidebar from "./components/Sidebar.vue";
	import Loader from "../app/components/Interactive/Loader.vue";
	import { authService } from "../services/auth.service";

	const AddWord = defineAsyncComponent(() => import("../Admin/views/AddWord.vue"));
	const AddAudio = defineAsyncComponent(() => import("../Admin/views/AddAudio.vue"));
	const DeleteWord = defineAsyncComponent(() => import("../Admin/views/DeleteWord.vue"));
	const UpdateWord = defineAsyncComponent(() => import("../Admin/views/UpdateWord.vue"));
	const PeekWords = defineAsyncComponent(() => import("../Admin/views/PeekWords.vue"));
	const Users = defineAsyncComponent(() => import("../admin/Users.vue"));

	const { pushToCloud } = OfflineStorage;
	const emitter = inject("emitter");

	let currentUser = ref(authService.currentUserValue);
	provide("currentUser", currentUser);

	//async states
	let useAccount = ref(false);
	let useUpdate = ref(false);
	let useClear = ref(false);
	let useError = ref(false);
	let useAudio = ref(false);
	let usePeek = ref(false);
	let useAdd = ref(false);
	let useSync = ref(false);
	let syncOk = ref(false);
	let syncLoad = ref(false);
	let showLoader = ref(null);
	let syncMessage = ref("Merging offline data");

	//emitter listener for toggles.
	emitter.on("addWord", () => {
		useAdd.value = !useAdd.value;
		useClear.value = false;
		useUpdate.value = false;
		useAudio.value = false;
		usePeek.value = false;
		useAccount.value = false;
	});
	emitter.on("addAudio", () => {
		useAudio.value = !useAudio.value;
		useAdd.value = false;
		useClear.value = false;
		useUpdate.value = false;
		usePeek.value = false;
		useAccount.value = false;
	});
	emitter.on("updateWord", () => {
		useUpdate.value = !useUpdate.value;
		useAdd.value = false;
		useClear.value = false;
		useAudio.value = false;
		usePeek.value = false;
		useAccount.value = false;
	});
	emitter.on("deleteWord", () => {
		useClear.value = !useClear.value;
		useAdd.value = false;
		useUpdate.value = false;
		useAudio.value = false;
		usePeek.value = false;
		useAccount.value = false;
	});
	emitter.on("peekWords", () => {
		usePeek.value = !usePeek.value;
		useAdd.value = false;
		useClear.value = false;
		useUpdate.value = false;
		useAudio.value = false;
		useAccount.value = false;
	});
	emitter.on("accountView", () => {
		useAccount.value = !useAccount.value;
		useAdd.value = false;
		useClear.value = false;
		useUpdate.value = false;
		useAudio.value = false;
		usePeek.value = false;
	});

	emitter.on("useSyncPass", (payload) => {
		useSync.value = true;
		syncOk.value = false;
		syncLoad.value = true;
		syncMessage.value = payload;
		setTimeout(() => {
			syncLoad.value = false;
			syncOk.value = true;
			useSync.value = false;
		}, 4000);
	});

	emitter.on("hide-loader", () => {
		showLoader.value = true;
	});
	emitter.on("useSyncInfo", (payload) => {
		useSync.value = true;
		syncOk.value = false;
		syncLoad.value = false;
		syncMessage.value = payload;
		setTimeout(() => {
			useSync.value = false;
			syncMessage.value = null;
		}, 3000);
	});

	emitter.on("useSyncError", (payload) => {
		useSync.value = true;
		syncOk.value = false;
		syncMessage.value = payload;
		setTimeout(() => {
			useSync.value = false;
			syncMessage.value = null;
		}, 3000);
	});
	emitter.on("syncOfflineData", async (payload) => {
		switch (payload[0]) {
			case "word":
				return await syncData(payload[0], payload);
			case "record":
				return await syncData(payload[0], payload);
			case "search":
				return await syncData(payload[0], payload);
			case "dict":
				return await syncData(payload[0], payload);
		}
	});
	async function syncData(constant, payload) {
		// await pushToCloud(constant, syncMessage, payload[1]);
		useSync.value = true;
		syncMessage.value = payload[1];
		try {
			await pushToCloud(constant, syncMessage, syncOk, payload[2]);
			setTimeout(() => {
				useSync.value = false;
			}, 5000);
		} catch (err) {
			setTimeout(() => {
				useSync.value = false;
			}, 5000);
		}
	}

	//   return pushToCloud(constant, syncMessage, payload[2])
	//     .then(res => {
	//       syncOk.value = true, syncLoad.value = false, setTimeout(() => {
	//         useSync.value = false; //syncMessage.value = null
	//       }, 3000)
	//     })
	//     .catch(err => {
	//       syncOk.value = false, syncLoad.value = false, setTimeout(() => {
	//         useSync.value = false; //syncMessage.value = null
	//       }, 3000)
	//     })
	//
</script>

<style scoped>
	#main {
		overflow-x: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	#main::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
</style>
