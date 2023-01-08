<template>
    <main v-if="useHome" class="flex flex-col items-center w-full gap-3 py-5 h-4/5">
        <section class="learnSection">
            <span class="w-full p-1 border-b border-b-slate-200 dark:border-b-slate-700">
                <h2 class="learnSectionHeader">Basic-level Igbo</h2>
                <div class="bg-gray-200"></div>
            </span>
            <div class="flex flex-col items-center w-4/5 gap-6">
                <div class="flex flex-col justify-between w-full gap-4 md:w-11/12 md:flex-row">
                    <button @click="emit('alpha')" class="learnSectionSpan">Alphabets (Abidii-igbo)</button>
                    <button @click="emit('number')" class="learnSectionSpan">Numbers (Onuogugu-igbo)</button>
                    <button @click="emit('vowels')" class="learnSectionSpan">Vowels & Consonants</button>
                </div>
                <div class="flex flex-col justify-start w-full gap-4 md:gap-10 md:flex-row md:w-11/12">
                    <button class="learnSectionSpan">School materials</button>
                    <button class="learnSectionSpan md:ml-1">Kitchen utensils</button>
                </div>
            </div>
        </section>
        <section class="learnSection">
            <span class="w-full p-1 border-b border-b-slate-200 dark:border-b-slate-700">
                <h2 class="learnSectionHeader">Advanced-level Igbo</h2>
                <div class="bg-gray-200"></div>
            </span>
            <div class="flex flex-col items-center w-4/5">
                <div class="flex flex-col justify-between w-full gap-4 md:w-11/12 md:flex-row">
                    <span class="learnSectionSpan">Igbo greetings</span>
                    <span class="learnSectionSpan">Igbo dishes</span>
                    <span class="learnSectionSpan">Igbo wears</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
const emit = defineEmits(["alpha", "numbers", "vowels"])
const Props = defineProps({
    useHome: {
        type: Boolean,
        default: false
    }
})

</script>