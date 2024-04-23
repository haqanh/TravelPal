<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" />
      </TransitionChild>

      <div v-if="login" class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="text-right m-4">
                <button
                  type="button"
                  class="bg-white rounded-lg p-2 justify-end text-right text-gray-400 hover:text-gray-500 hover:bg-indigo-200"
                  @click="closeModal"
                >
                  <span class="sr-only">Close menu</span>
                  <!-- Heroicon name: outline/x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form class="bg-white rounded px-8 pb-8 mb-4">
                <h1 class="text-xl mb-6 font-['Poppins'] font-semibold">Welcome to Travel Pal</h1>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-medium mb-2 font-['Poppins']"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight font-['Poppins'] focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-medium mb-2 font-['Poppins']"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight font-['Poppins'] focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Enter your password"
                  />

                  <!--div class="flex text-right items-end justify-end font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer">
                    Forgot Password?
                  </div-->
                </div>

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white block w-full py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  @click="SignIn"
                >
                  Sign in
                </button>

                <hr className="rounded-full border-2" />

                <button
                  class="bg-gray-700 hover:bg-gray-900 text-white block w-full py-2 px-4 mt-4 mb-4 rounded focus:outline-none focus:shadow-outline justify-center align-middle"
                  type="button"
                  @click="SignInWithGoogle"
                >
                  <span>
                    <img src="../assets/google.png" class="w-6 h-6 mb-0.5 mr-1 inline-block" />
                    or sign in with Google
                  </span>
                </button>

                <div className="flex justify-center items-center text-center gap-1">
                  <div className="Description text-zinc-900 text-xs font-normal font-['Poppins']">
                    Don't have an account?
                  </div>
                  <div
                    className="Description text-blue-600 underline text-xs font-normal hover:cursor-pointer font-['Poppins']"
                    @click="login = !login"
                  >
                    Become a Pal now
                  </div>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>

      <div v-else class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="text-right m-4">
                <button
                  type="button"
                  class="bg-white rounded-lg p-2 justify-end text-right text-gray-400 hover:text-gray-500 hover:bg-indigo-200"
                  @click="closeModal"
                >
                  <span class="sr-only">Close menu</span>
                  <!-- Heroicon name: outline/x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form class="bg-white rounded px-8 pb-8 mb-4">
                <h1 class="text-xl mb-6 font-['Poppins'] font-semibold">Become a Pal</h1>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-medium mb-2 font-['Poppins']"
                    for="signUpEmail"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight font-['Poppins'] focus:outline-none focus:shadow-outline"
                    id="signUpEmail"
                    type="email"
                    v-model="signUpEmail"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-2">
                  <label
                    class="block text-gray-700 text-sm font-medium mb-2 font-['Poppins']"
                    for="signUpPassword"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight font-['Poppins'] focus:outline-none focus:shadow-outline"
                    id="signUpPassword"
                    type="password"
                    v-model="signUpPassword"
                    placeholder="Enter your password"
                  />
                </div>

                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-medium mb-2 font-['Poppins']"
                    for="signUpConfirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight font-['Poppins'] focus:outline-none focus:shadow-outline"
                    id="signUpConfirmPassword"
                    type="password"
                    v-model="signUpConfirmPassword"
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white block w-full py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  @click="SignUp"
                >
                  Sign up
                </button>

                <hr className="rounded-full border-2" />

                <button
                  class="bg-gray-700 hover:bg-gray-900 text-white block w-full py-2 px-4 mt-4 mb-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  @click="SignInWithGoogle"
                >
                  <span>
                    <img src="../assets/google.png" class="w-6 h-6 mb-0.5 mr-1 inline-block" />
                    or sign in with Google
                  </span>
                </button>

                <div className="flex justify-center items-center text-center gap-1">
                  <div className="Description text-zinc-900 text-xs font-normal font-['Poppins']">
                    Already have an account?
                  </div>
                  <div
                    className="Description text-blue-600 underline text-xs font-normal hover:cursor-pointer font-['Poppins']"
                    @click="login = !login"
                  >
                    Log in here
                  </div>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { firebaseApp, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import {

  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

// Props declaration if not already done
const props = defineProps({
  open: Boolean
})

open.value = ref(false)
const login = ref(true)

// Watch for external changes to the `open` prop and update the local state
watch(
  () => props.open,
  (newVal) => {
    open.value = newVal
  }
)

const router = useRouter()

const email = ref('')
const password = ref('')

const signUpEmail = ref('')
const signUpPassword = ref('')
const signUpConfirmPassword = ref('')

const provider = new GoogleAuthProvider()

const SignIn = () => {
  const auth = getAuth(firebaseApp)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
      $toast.success('Welcome back!', {
        position: 'top'
      })
      router.push('/dashboard')
      
    })
    .catch((error) => {
      const errorMessage = error.message
      $toast.error(errorMessage, {
        position: 'top'
      })
    })
}

async function SignUp() {
  if (signUpPassword.value !== signUpConfirmPassword.value) {
    $toast.error('Passwords do not match!', {
      position: 'top'
    })
  } else {
    const auth = getAuth(firebaseApp)
    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        $toast.success('Welcome to TravelPal!', {
          position: 'top'
        })
        await addUser();
        console.log('Document successfully written! (outside)')
        router.push('/userprofiling')
      })
      .catch(async (error) => {
        const errorMessage = error.message
        $toast.error(errorMessage, {
          position: 'top'
        })
      })
  }
}

async function SignInWithGoogle() {
  const auth = getAuth(firebaseApp)
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      addUserGoogle(user.email);

      router.push('/dashboard')
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      $toast.error(errorMessage, {
        position: 'top'
      })
    })
}

const emit = defineEmits(['close'])

function closeModal() {
  open.value = false
  emit('close')
}

async function addUser() {
  console.log("inside addUser")
  console.log(signUpEmail.value)
  try {
    await setDoc(doc(db, "users", signUpEmail.value), {
      email: signUpEmail.value,
    }, {merge: true});
    console.log('Document successfully written!')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

async function addUserGoogle(email) {
  try {
    await setDoc(doc(db, "users", email), {
      email: email,
    }, {merge: true});
  } catch (e) {
    console.error('Error adding document: ', e)
  }   
}


</script>

