<template>
    <form @submit.prevent=""
        class="flex flex-col items-center justify-around w-11/12 p-2 border rounded-md md:w-3/4 bg-gray-50 h-72">
        <span class="flex flex-col justify-between w-3/4 gap-1">
            <label for="email" class="w-2/5 text-sm font-semibold text-slate-800">Email address</label>
            <input v-model.trim="email" id="email" type="text" class="registrationInput" />
        </span>
        <span class="flex flex-col justify-between w-3/4 gap-1">
            <label for="password" class="w-2/5 text-sm font-semibold text-slate-800">Password</label>
            <input v-model.trim="passwordOne" id="password" type="password" class="registrationInput" />
        </span>
        <span class="flex flex-col justify-between w-3/4 gap-1">
            <label for="password" class="w-3/5 text-sm font-semibold md:w-2/5 text-slate-800">Confirm
                Password</label>
            <input @focusout="checkInput" v-model.trim="passwordTwo" id="password" type="password"
                :class="hasError ? 'registrationInputError' : 'registrationInput'" />
        </span>
        <span v-if="isAdmin" class="flex flex-col justify-between w-3/4 gap-1">
            <label for="code" class="w-2/5 text-sm font-semibold text-slate-800">Admin Code</label>
            <input v-model.trim="adminCode" id="code" type="password" class="registrationInput" />
        </span>
        <button :disabled="hasError" type="submit"
            class="w-3/4 p-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">{{
                    hasError ?
                        'Input error' : 'SignUp for account'
            }}</button>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

let email = ref('')
let passwordOne = ref('')
let passwordTwo = ref('')
let adminCode = ref('')
let isAdmin = ref(false)
let hasError = ref(false);

function checkInput() {
    if (passwordTwo.value !== passwordOne.value) return hasError.value = true
    hasError.value = false
}

// watchEffect(() => {
       //try to watch how to make watchEffect run after a given period of time.
// })
</script>

<style scoped>
</style>