<template>
  <div
    class="flex flex-col items-center justify-start overflow-x-hidden select-none"
  >
    <header
      class="flex flex-row items-center justify-between w-full px-4 py-3 border-b border-gray-200"
    >
      <h1 class="flex font-semibold font-body">UPDATE LIBRARY</h1>
      <ul class="flex gap-4">
        <router-link :to="{ name: 'Admin' }"
          ><li class="text-sm font-semibold font-body">
            Welcome Admin
          </li></router-link
        >
        <router-link :to="{ name: 'Search' }"
          ><li class="text-sm font-semibold font-body">
            Homepage
          </li></router-link
        >
      </ul>
    </header>
    <!-- Container for the two Upload forms -->
    <div class="shell">
      <span class="flex flex-row justify-start w-full gap-x-56">
        <button class="btns" @click="showForm1 = !showForm1">
          Add a new word to the repository here:
        </button>
        <button class="btns" @click="showForm2 = !showForm2">
          Update Genre of existing words:
        </button>
      </span>
      <!-- The Forms -->
      <span class="flex flex-row justify-between w-full gap-20">
        <form
          @submit.prevent="addPost"
          class="flex flex-col justify-around w-1/2 gap-3 py-4"
          v-if="showForm1"
        >
          <div
            class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 font-body"
          >
            <label for="english">English Words</label>
            <input
              type="text"
              id="english"
              name="english"
              placeholder="Enter an English word"
              required
              v-model="name"
              class="lowercase input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
            />
          </div>
          <div
            class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 font-body"
          >
            <label for="igbo">Igbo Translation</label>
            <input
              type="text"
              id="igbo"
              name="igbo"
              placeholder="Enter Igbo translation"
              required
              v-model="translation"
              class="lowercase input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
            />
          </div>
          <div
            class="flex flex-row items-center justify-between gap-4 p-2 text-gray-800 font-body"
          >
            <label for="igbo">Word Genre</label>
            <input
              type="text"
              id="genre"
              name="igbo"
              placeholder="e.g: Medicals(Noun)"
              required
              v-model="genre"
              class="lowercase input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
            />
          </div>
          <!-- submitting section -->
          <span class="flex flex-row items-center gap-2 p-2 text-right">
            <button
              class="sub-btns hover:bg-green-400 hover:shadow-md hover:border-transparent"
            >
              Upload
              <!-- loading state -->
              <i class="flex items-center" v-if="Loading">
                <svg
                  role="status"
                  class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
              </i>
              <!-- loaded state -->
              <i class="flex flex-row items-center" v-if="ok_upload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="ok_class"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </i>
              <!-- failed state-->
              <i class="flex flex-row items-center" v-if="fail_upload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="fail_class"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </i>
            </button>
          </span>
        </form>
        <form
          @submit.prevent="updateOnePost"
          class="flex flex-col justify-around w-1/2 gap-3 py-4"
          v-if="showForm2"
        >
          <div
            class="flex flex-col justify-start w-full gap-4 text-gray-800 font-body"
          >
            <span class="flex flex-row items-center justify-between gap-4 p-2">
              <label for="patchName">English Word Only!</label>
              <input
                type="text"
                placeholder="Enter the word"
                v-model="patchName"
                required
                class="input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
              />
            </span>
            <span
              class="flex flex-row items-center justify-between gap-4 p-2 mb-16"
            >
              <label for="patchGenre">New Genre</label>
              <input
                type="text"
                placeholder="e.g: Medicals(Noun)"
                v-model="patchGenre"
                required
                class="input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
              />
            </span>
          </div>
          <!-- submitting section -->
          <span class="flex flex-row items-center gap-2 p-2 text-right">
            <button
              class="sub-btns hover:bg-green-400 hover:shadow-md hover:border-transparent"
            >
              Update
              <!-- loading state -->
              <i class="flex items-center" v-if="Loading">
                <svg
                  role="status"
                  class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
              </i>
              <!-- loaded state -->
              <i class="flex flex-row items-center" v-if="ok_patch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="ok_class"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="fail_class"
                  v-if="fail_patch"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </i>
            </button>
          </span>
        </form>
      </span>
    </div>
    <br />
    <!-- Container for the three elements Query operations -->
    <div class="shell">
      <span class="flex flex-row justify-between w-5/6 gap-8">
        <button @click="fetchPost" class="btns-safe">
          See all Uploads
          <!-- loading state -->
          <i class="flex items-center" v-if="Serve">
            <svg
              role="status"
              class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          </i>
          <!-- failed state -->
          <i class="flex flex-row items-center" v-if="fail_fetch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="fail_class"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
          <!-- loaded state -->
          <i class="flex flex-row items-center" v-if="ok_fetch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="ok_class"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </button>
        <button @click="refreshStore" class="mr-auto btns-safe">
          Clear view below
        </button>
        <button @click="alertme" class="btns-danger">
          Delete Entire Library!
        </button>
      </span>
      <div class="flex flex-row gap-4 p-2">
        <div
          class="flex flex-row flex-wrap gap-1 p-1 border border-gray-100 rounded-md"
        >
          <li
            class="tags"
            v-for="{ name, translation, genre, _id } in allposts.data"
            :key="_id"
          >
            "{{ name }} > {{ translation }} -> {{ genre }}"
          </li>
        </div>
      </div>
    </div>
    <br />
    <!-- Container for the Delete form -->
    <div
      class="z-10 flex flex-col justify-around w-4/5 gap-4 px-12 py-8 my-8 transition duration-300 border-2 border-gray-200 rounded-md shadow-sm hover:border-2 hover:border-red-400"
    >
      <h2 class="w-44 btns hover:bg-gray-200" @click="useDelete = !useDelete">
        Delete a Post Here:
      </h2>
      <!-- Form here -->
      <form
        @submit.prevent="removePost"
        class="flex flex-col gap-4"
        v-if="useDelete"
      >
        <span
          class="flex flex-row items-center justify-around w-1/2 gap-2 text-gray-800 font-body"
        >
          <label for="deleteConst">Delete a post here:</label>
          <input
            type="text"
            placeholder="Enter the word here"
            v-model="deleteConst"
            required
            class="input-bar hover:bg-gray-100 hover:border-gray-300 focus:border-gray-300"
          />
        </span>
        <span class="flex flex-row items-center justify-start w-1/2 gap-4 px-6">
          <button class="btns-danger">
            Delete word
            <i class="flex flex-row items-center">
              <!-- success state -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="ok_class"
                v-if="ok_delete"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- failed state -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="fail_class"
                v-if="fail_delete"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- loading state -->
              <svg
                role="status"
                class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="Loading"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
            </i>
          </button>
        </span>
      </form>
    </div>
    <!-- Footer Here -->
    <footer
      class="fixed bottom-0 z-50 flex flex-row justify-around w-full gap-3 px-4 py-1 bg-gray-700"
    >
      <span
        class="flex flex-row items-center justify-around mr-auto text-xs text-gray-400 font-body"
        ><p>Count of words uploaded: {{ allposts?.data?.length }}</p></span
      >
      <span
        @click="useSwitch('cloud')"
        class="flex flex-row items-center justify-around gap-1 px-2 text-xs text-gray-400 cursor-pointer font-body hover:bg-slate-600"
      >
        <p>Cloud</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
          />
        </svg>
      </span>
      <span
        @click="useSwitch('local')"
        class="flex flex-row items-center justify-around gap-1 px-2 text-xs text-gray-400 cursor-pointer font-body hover:bg-slate-600"
      >
        <p>Offline</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
          />
          <path
            d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
          />
          <path
            d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
          />
        </svg>
      </span>
      <span
        class="flex flex-row items-center justify-around gap-1 px-2 text-xs text-gray-400 cursor-pointer font-body hover:bg-slate-600"
      >
        <p>Server status</p>
        <!-- success with server -->
        <i class="flex items-center" :class="useState" v-if="serverState">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </i>
        <!-- loading server state (spinner)-->
        <i class="flex items-center" v-if="serverLoading">
          <svg
            role="status"
            class="w-3 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
        </i>
        <!-- failed state -->
        <i class="flex items-center" v-if="fail_server">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            :class="fail_class"
          >
            <path
              fill-rule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </span>
    </footer>
  </div>
</template>
<script setup>
import isOnline from "is-online";
import { useRouter } from "vue-router";
import { StateProxy } from "../../scripts/Proxy";
import { Requests, Utilities, OfflineStorage } from "../../scripts/Services";
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  unref,
  watchEffect,
} from "vue";
const { getState } = StateProxy;
const { handleOffline, pushToCloud } = OfflineStorage;
const { returnState, returnSwitch } = Utilities;
const { fetchAllPost, addNewPost, deletePost, patchPost, useRefreshStore } =
  Requests;
const Router = useRouter();

//template vars
let uploadSuccess = ref(false);
let allposts = ref(Array);
let usePost = ref(Array);
let message = ref(""); //stores return state of all request
let deleteConst = ref("");
let name = ref("");
let translation = ref("");
let genre = ref("");
let patchName = ref("");
let patchGenre = ref("");
let serverState = ref(null);
//request vars
let ok_fetch = ref(false);
let fail_fetch = ref(false);
let ok_upload = ref(false);
let ok_patch = ref(false);
let ok_delete = ref(false);
let fail_upload = ref(false);
let fail_patch = ref(false);
let fail_delete = ref(false);
let fail_server = ref(false);
//dynamic vars
let showForm1 = ref(false);
let showForm2 = ref(false);
let useDelete = ref(false);
let ok_class = ref("text-green-600");
let fail_class = ref("text-red-500");
//the two variables below should be defined in a store, {reusable across methods}
let serverLoading = ref(null);
let Loading = ref(null);
let Serve = ref(null);
//footer vars
let localLoading = ref(null);
let localLoaded = ref(null);
let cloudLoading = ref(null);
let cloudLoaded = ref(null);

//fetch data from idb on component mount.
onMounted(async () => {
  // await pushToCloud();
  // const p = await isOnline();
  // console.log(p);
});

//computed issues
//computed to render ok_class if serverState is true, and fail_class if serverState is false
const useState = computed(() => {
  if (serverState.value) {
    return ok_class.value;
  } else {
    return fail_class.value;
  }
});
watchEffect(() => {
  name.value = name.value.toLowerCase().trim();
  genre.value = genre.value.toLowerCase().trim();
  translation.value = translation.value.toLowerCase().trim();
});

//functions
async function getServerState() {
  returnState(serverLoading, serverState, fail_server);
  //todo: would be used to ensure connection is established before reqs or posts.
}
function refreshStore() {
  useRefreshStore(allposts, Router);
}

getServerState();

async function fetchPost() {
  await fetchAllPost(ok_fetch, Serve, allposts, fail_fetch);
}
async function addPost() {
  try {
    const onlineState = await getState();
    onlineState
      ? (console.log("sending online"),
        await addNewPost(
          fail_upload,
          Loading,
          message,
          ok_upload,
          name.value,
          translation.value,
          genre.value,
          Router
        ))
      : console.log("Saving to IndexedDb"),
      await handleOffline(name.value, translation.value, genre.value);
  } catch (err) {
    //left for dev. purposes (localDB for storage.)
    switch (err.message) {
      case "Network Error":
        console.log("Saving to IndexedDb");
        await handleOffline(name.value, translation.value, genre.value);
        break;
      default:
        console.log("Network Error");
        break;
    }
  }
}
async function removePost() {
  await deletePost(
    fail_delete,
    Loading,
    deleteConst,
    message,
    ok_delete,
    unref,
    Router
  );
}
async function updateOnePost() {
  await patchPost(
    fail_patch,
    ok_patch,
    Loading,
    message,
    patchName,
    patchGenre,
    Router
  );
}
async function useSwitch(data) {
  await returnSwitch(
    data,
    localLoading,
    localLoaded,
    cloudLoading,
    cloudLoaded
  );
}
</script>
