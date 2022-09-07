<template>
    <div v-if="useNumber" class="flex items-center w-full h-screen bg-slate-900">
        <h1 class="absolute ml-32 text-3xl left-1/3 text-slate-200">IN PROGRESS</h1>
    </div>
</template>

<script setup>

const Props = defineProps({
    useNumber: {
        type: Boolean,
        default: false
    }
})
</script>