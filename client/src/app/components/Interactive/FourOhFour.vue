<template>
    <div class="flex flex-col items-center justify-center gap-4 font-body">
        <img src="../../assets/error.svg" class="w-1/3" alt="">
        <div class="flex flex-col items-center gap-3">
            <h1 class="text-5xl font-semibold text-slate-600">404</h1>
            <span>
                <h3 class="text-2xl font-medium text-slate-500">You have reached a dead end</h3>
                <p class="font-medium text-slate-500">Sit tight while we figure out why, or go
                    <router-link class="font-semibold text-blue-600" :to="{ name: 'Register' }">Home</router-link>
                </p>
            </span>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>