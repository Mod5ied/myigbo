<template>
    <div id="guidelineCard">
        <section id="top_section">
            <span id="top_span"></span>
            <span id="body_span"></span>
        </section>
        <section id="bottom_section">
            <div id="counter">
                <p>Step {{ count }}</p>
                <span></span>
            </div>
            <button>NEXT</button>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const guidelineCard = {
    count: ref(0),
    arrayCounter: ref([])
}


</script>

<style lang="scss" scoped>

</style>