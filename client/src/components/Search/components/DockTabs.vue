<template>
  <Transition>
    <footer v-if="useButtons"
      class="fixed flex flex-row justify-center w-full gap-10 px-5 py-2 bottom-4 md:bottom-2 md:gap-20">
      <!-- Should grab data and search and give its dictionary when btn is clicked -->
      <span class="search-btns" v-if="useDict" title="Dictionary">
        <router-link :to="{ name: 'Dictionary' }">
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
              </path>
            </svg>
          </i>
        </router-link>
      </span>
      <span class="search-btns" v-if="useSearch" @click="emitter.emit('reset-search')" title="Translate Words">
        <span>
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </i>
        </span>
      </span>
      <span class="search-btns" v-if="useGames" @click="emitter.emit('show-games')" title="Practice Here!">
        <span>
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
            </svg>
          </i>
        </span>
      </span>
      <span class="search-btns" v-if="useSpeaker" title="Learn to speak">
        <router-link :to="{ name: 'Dictionary' }">
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clip-rule="evenodd" />
            </svg>
          </i>
        </router-link>
      </span>
      <span class="search-btns" v-if="useLearn" title="Learn Igbo">
        <router-link :to="{ name: 'Learn' }">
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </i>
        </router-link>
      </span>
      <span class="search-btns" v-if="useExit" title="Exit" @click="refreshState">
        <a>
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </i>
        </a>
      </span>
      <span class="search-btns" v-if="useReturn" title="return to previous page"
        @click.once="emitter.emit('return-to-learn')" @dblclick="router.push({ name: 'Search' })">
        <a>
          <i class="flex items-center text-gray-100">
            <svg class="w-6 h-6 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </i>
        </a>
      </span>
    </footer>
  </Transition>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const Props = defineProps({
  useDict: {
    type: Boolean,
    default: true
  },
  useLearn: {
    type: Boolean,
    default: false
  },
  useGames: {
    type: Boolean,
    default: false
  },
  useSpeaker: {
    type: Boolean,
    default: false
  },
  useExit: {
    type: Boolean,
    default: false
  },
  useReturn: {
    type: Boolean,
    default: false
  },
})

//reactive button states.
let useSearch = ref(true);
let useButtons = ref(true);
let useDict = ref(Props.useDict);
let useExit = ref(Props.useExit);
let useGames = ref(Props.useGames);
let useReturn = ref(Props.useReturn);
let useSpeaker = ref(Props.useSpeaker);
const useState = [false, true];


//event bus initialized.
const emitter = inject("emitter");
emitter.on("hide-buttons", (payload) => {
  //comes form {search-box} hides speak & dict.
  useSpeaker.value = payload[0];
  useDict.value = payload[0];
  useExit.value = true;
});
emitter.on("hide-search-button", (payload) => {
  useButtons.value = payload;
});
emitter.on("show-search-button", (payload) => {
  useButtons.value = payload;
});

//refresh 'fn'.
const refreshState = () => {
  useExit.value = false;
  useDict.value = true;
  emitter.emit("clear-input"); //goes across to {Search-box}.
  emitter.emit("clear-result", false); //goes up to {Search}.
  emitter.emit("revert-btns", useState); //goes across to {Search-box} input btns.
};

</script>
