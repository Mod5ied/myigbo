<template>
	<span id="desktop_Menu" :class="Props.display">
		<section class="flex flex-row gap-2">
			<section class="flex flex-row">
				<!-- ******* Video feature ******* -->
				<a class="search-link2" title="Video call" @click="toggleDropdown('video')">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-5">
						<path
							d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z"
						/>
					</svg>
					<!-- ******** Video feature Dropdown ******** -->
					<span class="hover-drop" v-if="useVideoCall">
						<p>Use our video feature to learn and practice face to face with a qualified tutor!</p>
						<button class="hover-drop-btn" title="Start video">Start Video</button>
					</span>
				</a>

				<!-- ***** Feedback ****** -->
				<a class="search-link2" title="Feedback" @click="toggleDropdown('feedback')">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
						/>
					</svg>
					<!-- ********* Feedback Dropdown ************ -->
					<span class="hover-drop" v-if="useFeedback">
						<p>Use our feedback feature to make suggestions or react to our products by sending us a mail.</p>
						<button class="hover-drop-btn" title="Send feedback">Send Feedback</button>
					</span>
				</a>

				<!-- ***** Settings ***** -->
				<a class="search-link2" title="please wait!" @click="toggleDropdown('settings')">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-5">
						<path
							fill-rule="evenodd"
							d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
							clip-rule="evenodd"
						/>
					</svg>
					<!-- ********* Settings Dropdown ********** -->
					<span class="justify-start hover-drop-settings" title="loading..." v-if="useSettings">
						<p class="flex flex-row items-center justify-between font-bold text-slate-600">
							Generic responses:
							<span class="flex flex-row gap-2 p-1 border rounded border-slate-300 md:w-16 bg-slate-100">
								<!-- activate. -->
								<!-- shaded-active -->
								<svg
									@click="toggleSwitch('active-first')"
									v-if="switchState.activeOne"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-6 h-6 text-blue-500"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									@click="toggleSwitch('active-first')"
									v-if="switchState.activeTwo"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<!-- negate. -->
								<!-- shaded-inactive -->
								<svg
									@click="toggleSwitch('inactive-first')"
									v-if="switchState.inactiveOne"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 text-blue-500"
								>
									<path
										fill-rule="evenodd"
										d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									@click="toggleSwitch('inactive-first')"
									v-if="switchState.inactiveTwo"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</span>
						</p>
						<!-- ********** -->
						<p class="flex flex-row items-center justify-between font-bold text-slate-600">
							Longer inputs:
							<span class="flex flex-row gap-2 p-1 border rounded border-slate-300 md:w-16 bg-slate-100">
								<!-- activate. -->
								<!-- shaded-active -->
								<svg
									@click="toggleSwitch('active-second')"
									v-if="switchState.activeThree"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-6 h-6 text-blue-500"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									@click="toggleSwitch('active-second')"
									v-if="switchState.activeFour"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<!-- negate. -->
								<!-- shaded-inactive -->
								<svg
									@click="toggleSwitch('inactive-second')"
									v-if="switchState.inactiveThree"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 text-blue-500"
								>
									<path
										fill-rule="evenodd"
										d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
										clip-rule="evenodd"
									/>
								</svg>
								<svg
									@click="toggleSwitch('inactive-second')"
									v-if="switchState.inactiveFour"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</span>
						</p>
					</span>
				</a>
			</section>
			<!-- ******* Admin & Learn ******* -->
			<section class="flex flex-row">
				
				<router-link class="search-link2" title="Admin page" :to="{ name: 'Admin' }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
						<path
							fill-rule="evenodd"
							d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
							clip-rule="evenodd"
						/>
					</svg>
				</router-link>

				<a class="search-link2" title="Learn igbo" @click="dispatchToggle(title)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
						<path
							d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"
						/>
						<path
							d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"
						/>
						<path
							d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z"
						/>
					</svg>
				</a>
			</section>

			<!-- Accounts Icons. -->
			<button
				@click="useAccountPopup = !useAccountPopup"
				class="flex flex-row items-center gap-1 p-3 transition-all duration-150 rounded-full md:rounded-none hover:bg-slate-100 dark:hover:bg-transparent"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-slate-600 dark:text-blue-800 md:w-6 md:h-6">
					<path
						fill-rule="evenodd"
						d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="hidden text-sm font-semibold text-slate-800 dark:text-slate-300 md:block">{{ accountState }}</span>
				<span class="account-block" v-if="useAccountPopup">
					<section class="border-b account-block-links">
						<h3 class="px-2 py-1 text-xs font-semibold">{{ userId }}</h3>
						<p class="px-2 py-1 text-sm">{{ userEmail }}</p>
					</section>
					<section class="border-b account-block-links">
						<p class="px-2 text-base dark:text-slate-100 text-slate-700">Personal</p>
					</section>
					<section class="border-b cursor-pointer account-block-links">
						<a class="px-2 py-1 text-sm transition-all duration-200 rounded-sm hover:bg-slate-200">Manage Account</a>
						<a class="px-2 py-1 text-sm transition-all duration-200 rounded-sm hover:bg-slate-200">Log-out</a>
					</section>
				</span>
			</button>

			<!-- <router-link v-if="accountState === ''" class="search-link" :to="{ name: 'Register' }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-600 bg">
					<path
						d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
					/>
				</svg>
				SignUp here
			</router-link> -->
		</section>
	</span>
</template>

<script setup>
	import { inject, ref, reactive } from "vue";

	let accountState = ref(Props.accountName);
	let title = ref(Props.title);
	let useSettings = ref(false);
	let useFeedback = ref(false);
	let useVideoCall = ref(false);
	let useAccountPopup = ref(false);
	let switchState = reactive({
		activeOne: false,
		activeTwo: true,
		activeThree: false,
		activeFour: true,
		/*  */
		inactiveOne: false,
		inactiveTwo: true,
		inactiveThree: false,
		inactiveFour: true,
	});

	const emit = defineEmits(["togglLearn", "togglSearch"]);

	const Props = defineProps({
		display: String,
		title: String,
		accountName: String,
	});

	const emitter = inject("emitter");

	const dispatchToggle = (where) => {
		if (where === "Learn Igbo") {
			return emitter.emit("togglLearn");
		}
		emitter.emit("togglSearch");
	};

	function toggleDropdown(factor) {
		switch (factor) {
			case "feedback":
				useSettings.value = false;
				useVideoCall.value = false;
				useFeedback.value = !useFeedback.value;
				break;
			case "settings":
				useFeedback.value = false;
				useVideoCall.value = false;
				setTimeout(() => {
					useSettings.value = !useSettings.value;
				}, 1000);
				break;
			case "video":
				useFeedback.value = false;
				useSettings.value = false;
				useVideoCall.value = !useVideoCall.value;
				break;
		}
	}

	//Todo: Use Pinia for this task.

	function toggleSwitch(state) {
		switch (state) {
			case "active-first":
				switchState.activeOne = !switchState.activeOne;
				switchState.activeTwo = !switchState.activeTwo;
				setTimeout(() => {
					switchState.inactiveOne = false;
					switchState.inactiveTwo = true;
				}, 200);
				break;
			case "inactive-first":
				switchState.inactiveOne = !switchState.inactiveOne;
				switchState.inactiveTwo = !switchState.inactiveTwo;
				setTimeout(() => {
					switchState.activeOne = false;
					switchState.activeTwo = true;
				}, 200);
				break;
			case "active-second":
				switchState.activeThree = !switchState.activeThree;
				switchState.activeFour = !switchState.activeFour;
				setTimeout(() => {
					switchState.inactiveThree = false;
					switchState.inactiveFour = true;
				}, 200);
				break;
			case "inactive-second":
				switchState.inactiveThree = !switchState.inactiveThree;
				switchState.inactiveFour = !switchState.inactiveFour;
				setTimeout(() => {
					switchState.activeThree = false;
					switchState.activeFour = true;
				}, 200);
				break;
		}
	}
</script>
