<template>
  <form @submit.prevent="execSignup" ref="signupForm"
    class="flex flex-col items-center justify-around w-11/12 p-2 border rounded-md md:w-3/4 bg-gray-50 h-72">
    <span class="flex flex-col justify-between w-3/4 gap-1">
      <label for="email" class="w-2/5 text-sm font-semibold text-slate-800">Email address</label>
      <input v-model.trim="email" id="email" type="text" class="registrationInput" />
    </span>
    <span class="flex flex-col justify-between w-3/4 gap-1">
      <label for="password" class="w-2/5 text-sm font-semibold text-slate-800">Password</label>
      <input v-model.trim="passwordOne" type="password" class="registrationInput" />
    </span>
    <span class="flex flex-col justify-between w-3/4 gap-1">
      <label for="password" class="w-3/5 text-sm font-semibold md:w-2/5 text-slate-800">Confirm Password</label>
      <input @focusout="checkInput" v-model.trim="passwordTwo" type="password"
        :class="hasError ? 'registrationInputError' : 'registrationInput'" />
    </span>
    <span v-if="isAdmin" class="flex flex-col justify-between w-3/4 gap-1">
      <label for="code" class="w-2/5 text-sm font-semibold text-slate-800">Admin Code</label>
      <input v-model.trim="adminCode" id="code" type="password" class="registrationInput" />
    </span>
    <button :disabled="hasError" type="submit"
      class="w-3/4 p-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">
      {{ hasError ? "Input error" : "SignUp for account" }}
    </button>
  </form>
</template>

<script setup>
import { ref, onBeforeMount, inject } from "vue";
import { router } from "../app/routes/app.routes";
import { authService } from "../services/auth.service";

const emitter = inject("emitter");

let email = ref("");
let passwordOne = ref("");
let passwordTwo = ref("");
let adminCode = ref("");
let isAdmin = ref(false);
let hasError = ref(false);
let role = ref("user");
let path = ref("signUp");
let signupForm = ref(null)
let signupResult = ref("")

function checkInput() {
  if (passwordTwo.value !== passwordOne.value) return (hasError.value = true);
  hasError.value = false;
}

async function execSignup() {
  //handle this properly.
  if (email.value != "" && passwordOne.value != "") {
    signupResult.value = await authService.signup(email.value, passwordOne.value, path.value, role.value);

    // emit a 'switch-to-login' event to parent component.
    switch (signupResult.value.error) {
      case true:
        emitter.emit("show-error", signupResult.value.message);
        signupForm.value.reset();
        return

      case false:
        // switch from sign-up to login.
        emitter.emit("account-on", signupResult.value.message);
        return;
    }
  }
}

onBeforeMount(async () => { });
</script>

<style scoped>

</style>
