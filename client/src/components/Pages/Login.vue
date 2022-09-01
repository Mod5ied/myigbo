<template>

    <form @submit.prevent=""
        class="flex flex-col items-center justify-around w-3/4 p-2 border rounded-md bg-gray-50 border-slate-300 h-72">
        <span class="flex flex-col justify-between gap-1 w-3/4">
            <label for="email" class="w-2/5 text-sm font-semibold text-slate-800">Email address</label>
            <input v-model.trim="email" id="email" type="text" class="registrationInput" />
        </span>
        <span class="flex flex-col justify-between gap-1 w-3/4">
            <label for="password" class="w-2/5 text-sm font-semibold text-slate-800">Password</label>
            <input v-model.trim="password" id="password" type="password" class="registrationInput" />
        </span>
        <button :disabled="hasError" type="submit"
            class="text-white p-2 bg-slate-900 hover:bg-slate-700 rounded-lg text-sm font-semibold w-3/4">Login to
            account </button>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const Props = defineProps({
    hasError: {
        type: Boolean,
        default: false
    }
})

let email = ref('')
let password = ref('')
</script>

<style scoped>
</style>