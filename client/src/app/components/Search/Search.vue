<template>
	<div class="h-screen overflow-hidden overflow-x-hidden bg-gray-100 select-none dark:bg-slate-900 font-body">
		<IntroPopup v-if="usePopUp" />
		<Header @toggl-theme="setDarkMode" :account-state="userData?.user?.email" :darkState="darkState" title="Learn Igbo" />
		<main class="flex flex-col items-center justify-center gap-3 py-10 md:px-5 md:py-6 md:gap-10">
			<div id="parent" class="flex flex-col items-center md:w-2/4 md:h-96">
				<!-- homepage image and texts. -->
				<Transition>
					<div id="intro" class="flex flex-col items-center justify-center gap-10" v-if="useIntro">
						<img :src="image2" alt="" class="w-1/2" />
						<span class="flex flex-col items-center justify-center gap-3 flex-cols">
							<h1 class="flex gap-2 text-3xl font-bold text-center text-cyan-600 dark:text-white">
								IGBO-LIBRARY
								<span class="font-black text-red-400">{{ name }} </span>
							</h1>
							<p class="w-4/5 text-sm font-medium text-center text-gray-400 md:w-full dark:text-slate-400">
								Discover translations, learn new words, synonyms and more in Igbo.
							</p>
						</span>
					</div>
				</Transition>
				<!-- homepage interactive quiz box. -->
				<SearchInteract v-if="useInteract" />
			</div>
			<Search_box v-if="useSearchBar" :HideArrow="HideArrow" :SearchClass="SearchClass" />
			<!-- homepage error pop-out box. -->
			<Transition>
				<div v-if="useError" class="error-card">
					<div>
						<h3 class="text-center text-slate-500 dark:text-slate-200">
							{{ errorState }}
						</h3>
					</div>
				</div>
			</Transition>
			<Transition>
				<SearchResult
					v-if="hasResult"
					:useRecord="useRecord"
					:passError="passError"
					:passErrorCode="passErrorCode"
					:pass-input-data="inputData"
				/>
			</Transition>
		</main>
		<DockTabs :use-games="true" :use-speaker="useSpeaker" :use-learn="true" />
	</div>
</template>

<script setup>
	import { defineAsyncComponent, inject, onErrorCaptured, onMounted, ref } from "vue";
	import { authService } from "../../../services/auth.service";
	import { useRouter } from "vue-router";
	import { get } from "idb-keyval";
	import Header from "./components/Header.vue";
	import DockTabs from "./components/DockTabs.vue";
	import image2 from "../../assets/Solutions_2.png";
	import Search_box from "./components/Search_box.vue";
	import IntroPopup from "../../../entry/introPopup.vue";

	const SearchInteract = defineAsyncComponent(() => import("../Interactive/Search_Interact.vue"));
	const SearchResult = defineAsyncComponent(() => import("./components/Search_result.vue"));
	const ErrorStates = defineAsyncComponent(() => import("../../../proxy/ErrorScript"));
	const { errorMatcher } = ErrorStates;
	const emitter = inject("emitter");
	const router = useRouter();
	const array = ["Translates", "Teaches", "Transcends", "By DigiAfriq"];

	//function to randomize home text.
	function arrDelay(arr, delegate, delay) {
		let i = 0;
		let interval = setInterval(() => {
			//each loop, call passed in function.
			delegate(arr[i]);
			//increment, & if we're past array, clr interval...
			if (i++ >= arr.length - 1) clearInterval(interval);
		}, delay);
		return interval;
	}

	//reactive states for all mini components
	let name = ref(array[3]);
	let hasResult = ref(false); //👈 if new search is truthy.
	let useIntro = ref(true); //👈 to show the intro section.
	let useSearchBar = ref(true); //👈 to show the tab buttons below.
	let useHistory = ref(true); //👈 to show the history tab.
	let useSpeaker = ref(false); //👈 to show the voice-out tab.
	let useInteract = ref(false); //👈 to show the interact section.
	let HideArrow = ref(false); // 👈 to hide the search-box arrow.
	let useArray = ref([]); // 👈 to store the array that is fetched on mount.
	let useRecord = ref({}); // 👈 to be sent to search-result > search-card.
	let useError = ref(false); // 👈 to used to toggle the error display.
	let passError = ref(false); // 👈 to be sent to search-result.
	let passErrorCode = ref(0); // 👈 to be sent to search-result.
	let errorState = ref(""); // 👈 to be sent to search-result > search-card.
	let inputData = ref(""); // sent to Search-results.
	let usePopUp = ref(null); // 👈 manages the popup state.
	let userData = ref(authService.currentUserValue); // 👈 sent to header.
	let SearchClass = "mt-10 md:mt-0"; //reactive class states.

	//dark nd light mode states.
	let currentState = ref(null);
	let darkState = ref(true);

	//emitters to grab user input.
	emitter.on("use-input-igbo", (payload) => {
		inputData.value = payload;
		matchWord(payload, "igbo");
	});
	emitter.on("use-input-english", (payload) => {
		inputData.value = payload;
		matchWord(payload, "english");
	});

	emitter.on("clear-result", (payload) => {
		//comes from {search-btns}
		hasResult.value = payload;
		useHistory.value = true;
	});
	emitter.on("show-results", (payload) => {
		hasResult.value = payload;
		useHistory.value = false;
	});
	emitter.on("hide-results", (payload) => {
		//comes from {search-box}
		hasResult.value = payload;
		useHistory.value = true;
	});
	emitter.on("show-games", () => {
		useIntro.value = false;
		setTimeout(() => {
			useInteract.value = true;
		}, 1000);
	});
	emitter.on("reset-search", () => {
		useInteract.value = false;
		setTimeout(() => {
			useSearchBar.value = true;
			useIntro.value = true;
		}, 1000);
	});
	emitter.on("togglLearn", () => {
		router.push({ name: "Learn" });
	});

	//emit to catch error events.
	emitter.on("invalid-word", (payload) => {
		useHistory.value = false;
		errorMatcher(payload, errorState);
		useError.value = true;
		setTimeout(() => {
			useError.value = false;
		}, 1000);
	});
	emitter.on("submit-error", (payload) => {
		useHistory.value = false;
		errorMatcher(payload[0], errorState);
		useError.value = true;
		setTimeout(() => {
			useError.value = false;
		}, 1200);
	});

	//emitter from suggest component.
	emitter.on("suggest-english-request", (payload) => {
		matchWord(payload, "english");
	});

	//fns() for tweaking light and dark modes.
	const setDarkMode = () => {
		if (!darkState.value || darkState.value === null) {
			//emit a set-to-dark event to App.vue and toggles to dark-mode.
			emitter.emit("set-theme", "dark");
			darkState.value = !darkState.value;
			return;
		}
		emitter.emit("set-theme", "light");
		darkState.value = !darkState.value;
	};

	const switchToIgbo = (input) => {
		//seek to manage app crash, should useArray be undefined||null.
		const result = useArray.value["data"].find((obj) => obj.translation === input);
		if (!result || result === null) {
			useRecord.value = {};
			passError.value = true;
			passErrorCode.value = 404;
			return;
		}
		//sent 2 search-result.
		passError.value = false;
		useRecord.value = result;
	};
	const switchToEnglish = (input) => {
		const result = useArray.value["data"].find((obj) => obj.name === input);
		if (!result || result == null) {
			useRecord.value = {};
			passError.value = true;
			passErrorCode.value = 404;
			return;
		}
		passError.value = false;
		useRecord.value = result;
	};

	/*TODO: search for english meanings of duplicate igbo words from the dict records instead,
	        rather than creating a new record for them each time. */

	const matchWord = (input, translation) => {
		switch (translation) {
			case "igbo":
				return switchToIgbo(input);
			case "english":
				return switchToEnglish(input);
			default:
				return switchToIgbo(input);
		}
	};

	/* fns() to check for theme-state in localStorage */
	const checkThemeState = () => localStorage.getItem("state");
	currentState.value = checkThemeState();

	const fetchRecords = async () => {
		try {
			useArray.value = await get("wordRecords");
		} catch (err) {
			useError.value = true;
			errorMatcher(503, errorState);
			setTimeout(() => {
				useError.value = false;
			}, 2000);
		}
	};

	const returnPopupState = () => {
		const state = localStorage.getItem("cardValue");
		if (state == null) {
			return usePopUp.value;
		} else if (state == false) usePopUp.value = localStorage.getItem("cardValue");
	};

	/* homepage name is altered,and entire data is fetched, once comp is mounted. */
	onMounted(async () => {
		arrDelay(array, (obj) => (name.value = obj), 6000);
		await fetchRecords();
		returnPopupState();
	});

	onErrorCaptured((error, component, info) => {
		//definitely logger here!!
		console.log("An error occurred: \n", error, "At Component: ", component, "What happened:", info);
	});
</script>
