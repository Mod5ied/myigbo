<template>
    <div class="h-screen overflow-hidden overflow-x-hidden bg-gray-100 select-none dark:bg-slate-900 font-body">
        <Header class="z-10" @toggl-theme="setDarkMode" @toggl-search="router.push({ name: 'Search' })"
            :dark-state="darkState" title="Search Words" />
        <Transition>
            <Home @alpha="toggleView('alpha')" @number="toggleView('number')" @vowels="toggleView('vowels')"
                :use-home="useHome" />
        </Transition>
        <Transition>
            <Alpha :use-alpha="useAlpha" />
        </Transition>
        <Transition>
            <Number :use-number="useNumber" />
        </Transition>
        <DockTabs :use-return="returnIcon" />
    </div>
</template>     

<script setup>
import { inject, ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../Search/components/Header.vue';
import DockTabs from '../../Search/components/DockTabs.vue';
import Home from './stack/home.vue';
const Alpha = defineAsyncComponent(() => import("./stack/alpha.vue"))
const Number = defineAsyncComponent(() => import("./stack/number.vue"))

const router = useRouter();
const emitter = inject("emitter");
const Props = defineProps({
    useLearn: {
        type: Boolean,
        default: false
    }
});

let darkState = ref(true);
let returnIcon = true;
let useHome = ref(true);
let useAlpha = ref(false)
let useNumber = ref(false)

emitter.on("return-to-learn", () => {
    useAlpha.value = false
    useNumber.value = false
    setTimeout(() => {
        useHome.value = true
        emitter.emit("can-use-router")
    }, 700)
})

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
    darkState.value = !darkState.value;
};

function toggleView(view) {
    switch (view) {
        case "alpha":
            useHome.value = false;
            setTimeout(() => { useAlpha.value = true }, 700)
            break;
        case "number":
            useHome.value = false;
            setTimeout(() => { useNumber.value = true }, 700)
            break;
        case "vowels":
            alert("Not functional!")
            // useHome.value = false;
            // setTimeout(() => useAlpha.value = true, 800)
            canReturn.value = !canReturn.value
            break;
    }
}
</script>