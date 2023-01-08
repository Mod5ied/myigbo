<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="absolute border rounded-md right-24 top-16 border-slate-300">
            <img :src="people" class="w-52" alt="" />
        </div>
        <div class="absolute border rounded-full left-20 bottom-10 border-slate-300">
            <img :src="world" class="w-92" alt="" />
        </div>
        <span>
            <p class="absolute font-medium right-10 bottom-5 font-body text-slate-900 dark:text-indigo-600">
                Founded by DigiAfrique
            </p>
        </span>
        <!-- opacity-wrapper here below. -->
        <div
            class="flex items-center justify-center w-screen h-screen opacity-75 bg-slate-200 dark:opacity-40 dark:bg-slate-900">
        </div>
        <div class="registrationFormWrapper">
            <div class="flex flex-row justify-around w-4/5 border md:w-1/3 border-slate-400">
                <p @click="showLogIn"
                    :class="useLogIn ? 'bg-slate-900 text-slate-200 font-semibold' : 'font-semibold bg-white'"
                    class="w-1/2 p-2 text-center border-r rounded-l-md border-r-slate-400">
                    Log-In
                </p>
                <p @click="showSignUp"
                    :class="useSignUp ? 'bg-slate-900 text-slate-200 font-semibold' : 'font-semibold bg-white'"
                    class="w-1/2 p-2 text-center rounded-r-md">
                    Sign-Up
                </p>
            </div>
            <!-- error ui here. -->
            <transition-group name="my-animation">
                <span v-if="showError"
                    class="absolute flex items-center justify-center w-4/6 h-16 ml-0 mr-0 -mt-8 bg-red-400 rounded-md">
                    <p class="text-center text-gray-100">{{ errorMessage }}</p>
                </span>
            </transition-group>
            <!-- prompt ui here. -->
            <transition-group name="my-animation">
                <span v-if="showPrompt"
                    class="absolute flex items-center justify-center w-4/6 h-16 ml-0 mr-0 -mt-8 bg-green-700 rounded-md">
                    <p class="text-center text-gray-200">{{ promptMessage }}</p>
                </span>
            </transition-group>

            <Transition>
                <SignUp v-if="useSignUp" :hasError="hasError" />
            </Transition>
            <Transition>
                <Login v-if="useLogIn" :hasError="hasError" />
            </Transition>
            <span class="relative flex items-center border dark:border-dotted md:right-40">
                <router-link class="p-1 text-sm font-semibold text-indigo-900" :to="{ name: 'Search' }">Continue without
                    Sign-Up</router-link>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                    </path>
                </svg>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from "vue";
import SignUp from "./SignUp.vue";
import Login from "./Login.vue";
import people from "../app/assets/people.png";
import world from "../app/assets/world.png";

const emitter = inject("emitter");

let useSignUp = ref(false);
let useLogIn = ref(true);
let hasError = ref(false);
let showError = ref(false);
let showPrompt = ref(false)
let errorMessage = ref("");
let promptMessage = ref("")

function showSignUp() {
    useLogIn.value = false;
    setTimeout(() => {
        useSignUp.value = true;
    }, 700);
}
function showLogIn() {
    useSignUp.value = false;
    setTimeout(() => {
        useLogIn.value = true;
    }, 700);
}

emitter.on("show-error", (error) => {
    errorMessage.value = error;
    showError.value = true;
    setTimeout(() => {
        showError.value = false;
        errorMessage.value = null
    }, 3000);
});

emitter.on("account-on", (msg) => {
    console.log(msg);
    promptMessage.value = msg;
    showPrompt.value = true;
    setTimeout(() => {
        showPrompt.value = false
        promptMessage.value = null
        showLogIn()
    }, 600)
})

</script>

<style scoped>
.my-animation-enter-active {
    transition: all 1s ease-in-out;
}

.my-animation-enter {
    transform: translateY(-100%);
}

.my-animation-leave-active {
    transition: all 1s ease-in;
}
</style>
