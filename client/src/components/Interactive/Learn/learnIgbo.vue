<template>
    <div class="h-screen overflow-hidden overflow-x-hidden bg-gray-100 dark:bg-slate-900 font-body">
        <Header @toggl-theme="setDarkMode" title="Search Words" @toggl-search="router.push({ name: 'Search' })" />
        <main class="flex flex-col items-center w-full gap-3 py-5 h-4/5">
            <section class="learnSection">
                <h2 class="learnSectionHeader">Basic-level Igbo</h2>
                <div class="flex flex-col items-center gap-6">
                    <div class="flex flex-col justify-between w-full gap-4 md:w-3/4 md:flex-row">
                        <span class="learnSectionSpan">Alphabets (Abidii-igbo)</span>
                        <span class="learnSectionSpan">Numbers (Onuogugu-igbo)</span>
                        <span class="learnSectionSpan">Vowels & Consonants</span>
                    </div>
                    <div class="flex flex-col justify-start w-full gap-4 md:gap-10 md:flex-row md:w-3/4">
                        <span class="learnSectionSpan">School materials</span>
                        <span class="learnSectionSpan md:ml-1">Kitchen utensils</span>
                    </div>
                </div>
            </section>
            <section class="learnSection">
                <h2 class="learnSectionHeader">Advanced-level Igbo</h2>
                <div class="flex flex-col items-center">
                    <div class="flex flex-col justify-between w-full gap-4 md:w-3/4 md:flex-row">
                        <span class="learnSectionSpan">Greetings</span>
                        <span class="learnSectionSpan">Igbo dishes</span>
                        <span class="learnSectionSpan">Igbo wears</span>
                    </div>
                </div>
            </section>
        </main>
        <DockTabs :use-speaker="speakerIcon" />
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../Search/components/Header.vue';
import DockTabs from '../../Search/components/DockTabs.vue';

let darkState = ref(true);
let speakerIcon = true;
const router = useRouter();
const emitter = inject("emitter");
const Props = defineProps({
    useLearn: {
        type: Boolean,
        default: false
    }
});

//fns() for tweaking light and dark modes.
const setDarkMode = () => {
    if (!darkState.value || darkState.value === null) {
        //emit a set-to-light event to App.vue and toggles to dark-mode.
        emitter.emit("set-theme", "dark");
        console.log(darkState.value);
        darkState.value = !darkState.value;
        return;
    }
    emitter.emit("set-theme", "light");
    console.log(darkState.value);
    darkState.value = !darkState.value;
};
</script>