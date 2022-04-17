<template>
  <div class="flex flex-col w-full gap-5">
    <div class="dict-cards" id="noun">
      <p class="text-gray-400 dark:text-white">Noun</p>
      <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
        <!-- Here,loop & render with nums being incremented by result num -->
        <!-- See dummy.js for clue -->
        <li>1. The female human</li>
        <!-- Figure out how to filter for words like {man, animals,ets} 
              thenapply the red-color and a link/function to those for a search.
        -->
        <li>2. A description of a man's wife</li>
      </ul>
    </div>
    <div class="dict-cards" id="verb">
      <p class="text-gray-400 dark:text-white">Adjectives</p>

      <ul class="flex flex-col gap-1 px-2 text-sm dark:text-slate-400">
        <li>1. Woman of action</li>
        <li>1. Woman-ism is the pillar of feminism</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>
