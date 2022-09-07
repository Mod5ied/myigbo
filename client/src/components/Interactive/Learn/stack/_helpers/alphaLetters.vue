<template>
    <!-- Ordinarily we should loop and render here, but not yet. -->
    <div class="flex flex-row flex-wrap items-center justify-center w-11/12 gap-5 p-3 md:w-3/4">
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[0] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[1] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[2] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[3] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[4] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[5] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[6] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[7] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[8] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[9] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[10] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[11] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[12] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[13] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[14] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[15] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[16] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[17] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[18] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[19] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[20] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[21] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[22] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[23] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[24] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[25] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[26] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[27] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[28] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[29] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[30] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[31] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[32] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[33] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[34] }}</p>
            <div class="alphaHidden"></div>
        </span>
        <span class="alphaSpan">
            <p class="alphaPara">{{ alphabets[35] }}</p>
            <div class="alphaHidden"></div>
        </span>
    </div>
</template>

<script setup>

/* Ordinarily this should come from the database, 
   but we're using hardcoded data for now. */

import { ref } from 'vue';

const Props = defineProps({
    alphabets: {
        type: Array,
        required: true
    }
})

const alphabets = ref(Props.alphabets)
</script>