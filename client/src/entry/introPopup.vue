<template>
	<div v-if="cardsBackground" class="absolute z-10 flex flex-col items-center justify-center w-full h-full opacity-90 bg-slate-900"></div>
	<div
		v-if="cardsContainer"
		class="flex items-center justify-center bg-slate-500 z-10 rounded-md md:h-72 md:w-[500px] absolute top-[35%] left-[35%]"
	>
		<!-- *********** -->
		<Transition name="bounce">
			<span class="intro-card" v-if="useSearchCard">
				<section class="flex justify-end px-3" @click="cancelCards">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cancel-btn">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</section>
				<section class="flex flex-col gap-2">
					<h3 class="text-lg font-bold text-center uppercase text-slate-800 dark:text-slate-200">
						Using the Translation feature
					</h3>
					<p class="px-4 text-center dark:text-slate-300">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere id ipsum officiis eos
						unde corrupti dicta ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere.
					</p>
				</section>
				<section class="flex flex-row md:justify-around">
					<button @click="skipCards" class="pop_card_btn_active">Skip</button>
					<button @click="nextCard('translate')" class="pop_card_btn">Next</button>
				</section>
			</span>
		</Transition>
		<!-- *********** -->
		<Transition name="bounce">
			<span class="intro-card" v-if="useDictCard">
				<section class="flex justify-end px-3" @click="cancelCards">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cancel-btn">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</section>
				<section class="flex flex-col gap-2">
					<h3 class="text-lg font-bold text-center uppercase text-slate-800 dark:text-slate-200">Using the dictionary</h3>
					<p class="px-4 text-center dark:text-slate-300">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere id ipsum officiis eos
						unde corrupti dicta ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere.
					</p>
				</section>
				<section class="flex flex-row md:justify-around">
					<button @click="skipCards" class="pop_card_btn_active">Skip</button>
					<button @click="nextCard('dictionary')" class="pop_card_btn">Next</button>
				</section>
			</span>
		</Transition>
		<!-- ************** -->
		<Transition name="bounce">
			<span class="intro-card" v-if="useLearnCard">
				<section class="flex justify-end px-3" @click="cancelCards">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cancel-btn">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</section>
				<section class="flex flex-col gap-2">
					<h3 class="text-lg font-bold text-center uppercase text-slate-800 dark:text-slate-200">Using the learning platform</h3>
					<p class="px-4 text-center dark:text-slate-300">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere id ipsum officiis eos
						unde corrupti dicta ipsum dolor sit amet consectetur, adipisicing elit. Asperiores ipsam rerum, facere.
					</p>
				</section>
				<section class="flex flex-row md:justify-around">
					<button @click="skipCards" class="pop_card_btn_active">Skip</button>
					<button @click="nextCard('learn')" class="pop_card_btn">Next</button>
				</section>
			</span>
		</Transition>
		<div v-if="useFinalCard" class="grid gap-2 place-content-center">
			<h3 class="text-2xl font-bold text-slate-200 dark:text-slate-200">Welcome to IgboLibrary</h3>
			<button @click="cancelCards" class="pop_card_btn_active">Continue to library</button>
			<span class="flex flex-row items-center gap-4 md:relative md:top-10 md:px-8">
				<input type="checkbox" @click="switchCardValue" v-model="cardValue" id="check" />
				<label for="check" class="font-semibold">Don't show again!</label>
			</span>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	let cardValue = ref(false);
	let useDictCard = ref(false);
	let useFinalCard = ref(false);
	let useLearnCard = ref(false);
	let useSearchCard = ref(true);
	let cardsContainer = ref(true);
	let cardsBackground = ref(true);

	function switchCardValue() {
		cardValue.value = false;
		console.log('saved');
		localStorage.setItem("cardValue", cardValue.value);
	}

	function nextCard(cardType) {
		switch (cardType) {
			case "dictionary":
				useDictCard.value = false;
				useSearchCard.value = false;
				setTimeout(() => {
					useLearnCard.value = !useLearnCard.value;
				}, 850);
				break;
			case "translate":
				useSearchCard.value = false;
				useLearnCard.value = false;
				setTimeout(() => {
					useDictCard.value = !useDictCard.value;
				}, 850);
				break;
			case "learn":
				useDictCard.value = false;
				useLearnCard.value = false;
				useSearchCard.value = false;
				setTimeout(() => {
					useFinalCard.value = !useFinalCard.value;
				}, 850);
				break;
		}
	}
	function skipCards() {}
	function cancelCards() {
		cardsBackground.value = false;
		cardsContainer.value = false;
	}
</script>

<style scoped>
	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}
	.bounce-leave-active {
		animation: bounce-in 0.9s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
