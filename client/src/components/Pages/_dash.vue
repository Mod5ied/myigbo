<template>
    <div class="flex items-center justify-center h-screen">
        <div class="absolute border rounded-md right-24 top-16 border-slate-300"><img :src="people" class="w-52" alt="">
        </div>
        <div class="absolute border rounded-full left-20 bottom-10 border-slate-300"><img :src="world" class="w-92"
                alt=""></div>
        <span>
            <p class="absolute font-medium right-10 bottom-5 font-body text-slate-900 dark:text-indigo-600">Founded by
                Sinq.io</p>
        </span>
        <!-- opacity-wrapper here below. -->
        <div class="flex items-center justify-center w-screen h-screen opacity-75 bg-slate-200 dark:opacity-40 dark:bg-slate-900">
        </div>
        <div class="registrationFormWrapper">
            <div class="flex flex-row justify-around w-1/3 border border-slate-400">
                <p @click="showLogIn"
                    :class="useLogIn ? 'bg-slate-900 text-slate-200 font-semibold' : 'font-semibold bg-white'"
                    class="w-1/2 p-2 text-center border-r border-r-slate-400">Log-In</p>
                <p @click="showSignUp"
                    :class="useSignUp ? 'bg-slate-900 text-slate-200 font-semibold' : 'font-semibold bg-white'"
                    class="w-1/2 p-2 text-center">
                    Sign-Up
                </p>
            </div>

            <Transition>
                <SignUp v-if="useSignUp" :hasError="hasError" />
            </Transition>
            <Transition>
                <Login v-show="useLogIn" :hasError="hasError" />
            </Transition>
            <span class="relative dark:border-dotted border right-40 flex  items-center">
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
import SignUp from './SignUp.vue';
import Login from './Login.vue';
import people from "../../assets/people.png"
import world from "../../assets/world.png"
import { ref } from 'vue';

let useSignUp = ref(false)
let useLogIn = ref(true)
let hasError = ref(false)

function showSignUp() {
    useLogIn.value = false
    setTimeout(() => {
        useSignUp.value = true
    }, 700)
}
function showLogIn() {
    useSignUp.value = false
    setTimeout(() => {
        useLogIn.value = true
    }, 700)
}

</script>

<style lang="scss" scoped>
</style>