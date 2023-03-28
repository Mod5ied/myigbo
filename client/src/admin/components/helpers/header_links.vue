<template>
	<div class="flex flex-row justify-between rounded-full md:rounded-none">
		<!-- <span id="menu" :class="Props.display">
			<router-link class="search-link" :to="{ name: 'Search' }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-600">
					<path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
					<path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
						clip-rule="evenodd"
					/>
				</svg>
				Search words
			</router-link>
			<router-link :to="{ name: 'Dictionary' }" class="search-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-yellow-600">
					<path
						d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z"
					/>
				</svg>
				Dictionary
			</router-link>
			<router-link class="search-link" :to="{ name: 'Learn' }">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 text-yellow-600"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
					/>
				</svg>
				Learn Igbo
			</router-link>
		</span> -->

		<section v-if="useSignOut">
			<form @submit.prevent="signOutUser" class="border-red-300 account-block">
				<!-- cancel this operation. CANCEL BTN -->
				<svg
					@click="useSignOut = !useSignOut"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 p-1 border border-red-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-800"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				<div class="flex flex-col gap-4 px-2 py-5">
					<p class="text-sm text-center">Enter password to logout</p>
					<input
						class="p-1 text-center border border-red-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600"
						type="password"
						placeholder="Your password here"
						v-model="userPassword"
					/>
				</div>
				<div class="relative px-2 bg-transparent rounded-md top-16">
					<button
						type="submit"
						class="w-full p-2 text-sm font-semibold bg-red-500 rounded-md center text-slate-50 hover:bg-red-600"
					>
						SignOut
					</button>
				</div>
			</form>
		</section>
		<section v-else>
			<button @click="useAccountPopup = !useAccountPopup">
				<a
					class="flex flex-row items-center justify-center gap-1 p-3 transition-all duration-150 rounded-full md:rounded-none hover:bg-slate-100 dark:hover:bg-transparent"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-6 text-blue-800 md:w-6 md:h-6"
					>
						<path
							fill-rule="evenodd"
							d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							clip-rule="evenodd"
						/>
					</svg>

					<span class="hidden text-sm text-slate-800 dark:text-slate-300 md:block">{{ accountState }}</span>
				</a>
			</button>
			<span class="account-block" v-if="useAccountPopup">
				<section class="border-b account-block-links">
					<h3 class="px-2 py-1 text-xs font-semibold">{{ userId }}</h3>
					<p class="px-2 py-1 text-sm">{{ userEmail }}</p>
				</section>
				<section class="border-b account-block-links">
					<p class="px-2 text-base dark:text-slate-100 text-slate-700">Personal</p>
				</section>
				<section class="border-b cursor-pointer account-block-links">
					<a class="admin-header-links-dropdown-bottom">Manage Account</a>
					<a class="admin-header-links-dropdown-bottom" @click="useSignOut = !useSignOut">Log-out</a>
				</section>
			</span>
		</section>
	</div>
</template>

<script setup>
	import { authService } from "../../../services/auth.service";
	import { ref, inject } from "vue";

	const userObject = ref(inject("currentUser"));
	const Props = defineProps({
		display: {
			type: String,
			default: false,
		},
	});

	let userEmail = ref(userObject.value.user.email);
	let userRole = ref(userObject.value.user.role);
	let userId = ref(userObject.value.user._id);
	let useAccountPopup = ref(false);
	let userPassword = ref(null);
	let useSignOut = ref(false);
	let accountState = "My Account";
	let path = "signOut";

	const signOutUser = () => {
		const res = authService.signout(userEmail.value, userPassword.value, path, userRole.value);
		console.log(res);
	};
</script>
