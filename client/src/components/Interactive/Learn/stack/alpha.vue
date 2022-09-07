<template>
    <div v-if="useAlpha" class="flex flex-col items-center w-full h-screen gap-3 bg-gray-100 dark:bg-slate-900">
        <div class="flex flex-col items-center w-4/5 px-2 py-4 ">
            <h2
                class="w-64 font-semibold text-center border border-gray-200 rounded dark:text-slate-300 md:text-xl dark:border-slate-700 dark:bg-slate-800 bg-slate-50">
                Igbo Alphabets
            </h2>
        </div>
        <main
            class="flex flex-col items-center w-11/12 p-2 overflow-y-scroll rounded-lg bg-slate-50 dark:bg-slate-800 md:w-4/5 h-1/2 md:overflow-hidden">
            <AlphaLetters :alphabets="alphaStrings" />
            <span
                class="absolute flex items-center justify-center w-10 h-10 mb-6 border md:hidden right-6 rounded-xl border-slate-600 bottom-80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-orange-600 ">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </main>
        <section
            class="flex flex-col justify-start w-4/5 gap-2 py-2 border-t border-t-slate-200 dark:border-t-slate-700">
            <span class="relative md:left-6 w-28">
                <h3 class="font-semibold text-slate-200 dark:text-slate-300 md:text-center">Fun facts</h3>
            </span>
            <div class="relative text-sm md:w-4/5 md:left-12">
                <p class="dark:text-slate-300">1. Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p class="dark:text-slate-300">2. Consequatur consectetur at omnis nesciunt nihil! Illo cumque facilis
                </p>
                <p class="dark:text-slate-300">3. laudantium vero animi quos provident ex. Harum impedit nihil earum
                    ipsam iure reprehenderit.</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import AlphaLetters from './_helpers/alphaLetters.vue';
import alphaStrings from "./_helpers/alphaStrings.js"


const Props = defineProps({
    useAlpha: {
        type: Boolean,
        default: false
    }
})
</script>