<template>
    <div class="absolute z-20 flex flex-col items-center w-full gap-1 md:w-3/4 md:h-full">
        <section
            class="flex flex-row items-center justify-around w-full h-12 px-12 bg-gray-800 border rounded-md border-slate-400 md:mt-14">
            <button class="text-lg font-search text-slate-200 hover:text-blue-800">Manage User Accounts</button>
            <button class="text-lg font-search text-slate-200 hover:text-blue-800">Manage Admin Accounts</button>
        </section>
        <section class="flex w-full px-12 bg-gray-800 border rounded-md md:h-3/4 border-slate-500">

            <div class="flex flex-col w-full gap-8 py-4 md:w-full">
                <h3 class="w-full p-2 font-medium text-center border-b font-search text-emerald-700">Active Users</h3>
                <span class="">
                    <span v-for="el in arr">
                        <p>{{ el }}</p> <button>Remove user</button>
                    </span>
                    <!-- <span>
                        <p>{{ 'email@gmail.com' }}</p> <button>Remove user</button>
                    </span> -->
                </span>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let arr = ref(['tristan@email.com', 'andrew@email.com', 'cobra@email.com']);

</script>