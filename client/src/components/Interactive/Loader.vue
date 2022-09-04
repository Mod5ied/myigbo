<template>
    <div v-if="!showLoader"
        class="flex items-center justify-center flex-col h-screen overflow-hidden overflow-x-hidden bg-gray-100 dark:bg-slate-900 font-body">
        <main class="flex items-center justify-center flex-col gap-4">
            <h1 class="text-4xl font-bold text-slate-600 dark:text-slate-200">IGBO LIBRARY.</h1>
            <span>
                <vue-loaders name="ball-pulse" color="#135bbf" scale="0.8"></vue-loaders>
            </span>
        </main>
        <span>
            <p class="absolute font-medium right-10 bottom-5 font-body text-slate-500 dark:text-slate-400">Founded by
                Sinq.io</p>
        </span>
    </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const emitter = inject("emitter")
const router = useRouter()
const props = defineProps({
    location: String,
    showLoader: Boolean
})

function redirectToLogin() {
    setTimeout(() => {
        router.push({ name: "Search" })
    }, 10000)
}

function hideLoaderPage() {
    setTimeout(() => { emitter.emit("hide-loader") }, 5000)
}

onMounted(() => {
    if (props.location === undefined || !props.location) {
        redirectToLogin()
        return;
    } else {
        hideLoaderPage();
    }

})

</script>

<style lang="scss" scoped>
</style>