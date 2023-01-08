<template>
  <Transition>
    <div class="flex flex-row justify-between gap-3 px-1 py-4 rounded-md w-80 md:w-96">
      <div
        class="flex flex-col items-center justify-center w-full gap-3 overflow-hidden bg-gray-300 rounded-md h-36 dark:bg-slate-700">
        <span class="flex flex-col justify-center w-full gap-1 p-2">
          <p class="flex items-center justify-between text-xs font-bold text-left text-slate-400">
            Pick the correct one:
            <i class="flex items-center text-xs text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd" />
              </svg>
            </i>
          </p>
          <p class="text-2xl font-bold text-center text-gray-500 dark:text-gray-300">
            Hand
          </p>
        </span>
        <!-- btns. -->
        <span class="relative flex items-center justify-center w-full border-b border-gray-600 dark:border-t top-3">
          <!-- programmatically fill in the contents. -->
          <button class="w-full p-2 text-gray-300 transition hover:duration-300 bg-slate-700 hover:bg-slate-400">
            Ukwu
          </button>
          <button class="w-full p-2 text-gray-300 transition hover:duration-300 bg-slate-500 hover:bg-slate-800">
            Aka
          </button>
        </span>
      </div>
      <!-- navs below. -->
      <div class="items-center hidden px-3 md:flex">
        <!-- v2, arrows would be replaced with actual fns that do navigation. -->
        <!-- <todo> To implement the switcher function. </todo> -->
        <i class="icon_style" @click="handleSwitch">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </i>
      </div>
    </div>
  </Transition>
</template>
<script setup>
/* Upcoming features:
    (1) Verification of users selection and notifying if users are correct.
    (2) Forward users to the next quiz if users passes each test.
    (3) Presenting a leaders board to current users based on others users who played the quiz.
*/

</script>
