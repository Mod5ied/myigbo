<template>
  <form @submit.prevent="execLogin"
    class="flex flex-col items-center justify-around w-11/12 p-2 border rounded-md md:w-3/4 bg-gray-50 border-slate-300 h-72">
    <span class="flex flex-col justify-between w-3/4 gap-1">
      <label for="email" class="w-2/5 text-sm font-semibold text-slate-800">Email address</label>
      <input v-model.trim="email" id="email" type="text" class="registrationInput" />
    </span>
    <span class="flex flex-col justify-between w-3/4 gap-1">
      <label for="password" class="w-2/5 text-sm font-semibold text-slate-800">Password</label>
      <input v-model.trim="password" id="password" type="password" class="registrationInput" />
    </span>
    <button :disabled="hasError" type="submit"
      class="w-3/4 p-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">
      Login to account
    </button>
  </form>
</template>

<script setup>
import { onBeforeMount, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { router } from "../app/routes/app.routes";
import { authService } from "../services/auth.service";

const Props = defineProps({
  hasError: {
    type: Boolean,
    default: false,
  },
});
const emitter = inject("emitter");
const route = useRouter()

let email = ref("");
let password = ref("");
let returnUrl = ref("");
let role = ref("user");
let path = ref("signIn");
let loginReturn = ref(null);

async function execLogin() {
  if (email.value != "" && password.value != "") {
    loginReturn.value = await authService.login(email.value, password.value, path.value, role.value);

    switch (loginReturn.value.error) {
      case true:
        // handle error visually here.
        emitter.emit("show-error", loginReturn.value.message)
        return;
      case false:
        // update a reactive variable that prompt the 'Account created'.
        if (loginReturn.value.token === true) {
          console.log(loginReturn.value);
          emitter.emit("account-on", "Login Successful")
          setTimeout(() => route.push("/search"), 3000) 
          return
        }
        return emitter.emit("show-error", "This user is logged-in, try reloading the page");
    }
  }
}

async function confirmLogin() {
  // on-mounted checks if 'currentUser' exists, if not it returns null.
  if (await authService.currentUserValue) {
    // todo: set a timer for this. Show a loader while waiting.
    setTimeout(() => {
      return router.push("/search");
    }, 3000)
  }
  return router.push("/register");
}

onBeforeMount(async () => {
  // await confirmLogin();
});
</script>

<style scoped>

</style>
