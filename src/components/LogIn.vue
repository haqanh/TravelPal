<template>
  
<div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
    <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Create a new account
    </div>
    <span class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account ?
        <a href="#" target="_blank" class="text-sm text-blue-500 underline hover:text-blue-700">
            Sign in
        </a>
    </span>
    <div class="p-6 mt-8">
        <form action="#">
            <div class="flex flex-col mb-2">
                <div class=" relative ">
                    <input type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Pseudo"/>
                    </div>
                </div>
                <div class="flex gap-4 mb-2">
                    <div class=" relative ">
                        <input type="text" id="create-account-first-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="First name" placeholder="First name"/>
                        </div>
                        <div class=" relative ">
                            <input type="text" id="create-account-last-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Last name"/>
                            </div>
                        </div>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input type="text" id="create-account-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                                </div>
                            </div>
                            <div class="flex w-full my-4">
                                <button type="submit" class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div class="flex items-center justify-center mt-6">
                            <div>
                                <label class="flex items-center mb-3 space-x-3">
                                    <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"/>
                                        <span class="font-normal text-gray-700 dark:text-white">
                                            Blue
                                        </span>
                                    </label>
                                    <label class="flex items-center mb-3 space-x-3">
                                        <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-pink-500 checked:border-transparent focus:outline-none"/>
                                            <span class="font-normal text-gray-700 dark:text-white">
                                                Pink
                                            </span>
                                        </label>
                                        <label class="flex items-center mb-3 space-x-3">
                                            <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none"/>
                                                <span class="font-normal text-gray-700 dark:text-white">
                                                    Green
                                                </span>
                                            </label>
                                            <label class="flex items-center mb-3 space-x-3">
                                                <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"/>
                                                    <span class="font-normal text-gray-700 dark:text-white">
                                                        Orange
                                                    </span>
                                                </label>
                                                <label class="flex items-center mb-3 space-x-3">
                                                    <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-500 checked:border-transparent focus:outline-none"/>
                                                        <span class="font-normal text-gray-700 dark:text-white">
                                                            Purple
                                                        </span>
                                                    </label>
                                                    <label class="flex items-center mb-3 space-x-3">
                                                        <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-black checked:border-transparent focus:outline-none"/>
                                                            <span class="font-normal text-gray-700 dark:text-white">
                                                                Black
                                                            </span>
                                                        </label>
                                                        <label class="flex items-center mb-3 space-x-3">
                                                            <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-indigo-500 checked:border-transparent focus:outline-none"/>
                                                                <span class="font-normal text-gray-700 dark:text-white">
                                                                    Indigo
                                                                </span>
                                                            </label>
                                                            <label class="flex items-center mb-3 space-x-3">
                                                                <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-red-500 checked:border-transparent focus:outline-none"/>
                                                                    <span class="font-normal text-gray-700 dark:text-white">
                                                                        Red
                                                                    </span>
                                                                </label>
                                                                <label class="flex items-center mb-3 space-x-3">
                                                                    <input type="checkbox" name="checked-demo" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-gray-500 checked:border-transparent focus:outline-none"/>
                                                                        <span class="font-normal text-gray-700 dark:text-white">
                                                                            Gray
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

</template>
    
<script>
    import firebaseApp from "@/firebase";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "SignIn",
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            signIn() {
                const auth = getAuth(firebaseApp);
                signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
            }
        }
    });

        
</script>
    
<style>
.login {
  align-items: flex-start;
  background-color: var(--white-ffffff);
  display: flex;
  flex-direction: column;
  gap: 228px;
  height: 572px;
  justify-content: space-around;
  padding: 48px;
  position: relative;
}

.login .frame {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 48px;
  position: relative;
  width: 100%;
}

.login .sign-in-forms {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;
}

.login .sign-in-form-web {
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 100%;
}

.login .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;
}

.login .element {
  align-self: stretch;
  color: #1a1a1a;
  font-family: "Poppins";
  font-size: var(--title-font-size);
  font-style: var(--title-font-style);
  font-weight: var(--title-font-weight);
  letter-spacing: var(--title-letter-spacing);
  line-height: var(--title-line-height);
  margin-top: -1px;
  position: relative;
}

.login .frame-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%;
}

.login .frame-3 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.login .input-configurator {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.login .input-configurator-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.login .satellite-input {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  padding: 0px 16px;
  position: relative;
  width: 100%;
}

.login .text-wrapper {
  color: var(--black-800-333333);
  flex: 1;
  font-family: "Poppins";
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 12px;
  margin-top: -1px;
  position: relative;
}

.login .regular-input-double-wrapper {
  align-self: stretch;
  background-color: var(--black-50-f2f2f2);
  border: 0.5px solid;
  border-color: var(--black-100-e5e5e5);
  border-radius: 6px;
  height: 48px;
  position: relative;
  width: 100%;
}

.login .regular-input-double {
  align-items: center;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  position: relative;
  width: 522px;
}

.login .emailinput {
  font-family: "Poppins";
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.login .frame-4 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 1px;
  position: relative;
}

.login .input-icons {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 16px;
  opacity: 0;
  padding: 8px;
  position: relative;
}

.login .login-icons {
  height: 16px;
  position: relative;
  width: 16px;
}

.login .union-wrapper {
  align-items: flex-start;
  background-color: var(--black-700-4d4d4d);
  border-radius: 8px;
  display: inline-flex;
  gap: 10px;
  padding: 5px;
  position: relative;
}

.login .union {
  height: 6px;
  margin-right: -182px;
  margin-top: -813.75px;
  position: relative;
  width: 6px;
}

.login .input-icons-2 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 16px;
  padding: 8px;
  position: relative;
}

.login .vector {
  height: 11px;
  left: 0;
  position: absolute;
  top: 3px;
  width: 16px;
}

.login .frame-5 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  position: relative;
  width: 100%;
}

.login .switcher-item-left {
  align-items: center;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 8px;
  position: relative;
}

.login .switcher {
  background-color: var(--black-50-f2f2f2);
  border: 0.5px solid;
  border-color: var(--black-100-e5e5e5);
  border-radius: 36.5px;
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 40px;
}

.login .knob-icon {
  height: 20px;
  width: 20px;
}

.login .knob {
  background-color: var(--white-ffffff);
  border-radius: 12px;
  box-shadow: 1px 1px 2px -1px #3333334c;
  height: 16px;
  left: 2px;
  position: relative;
  top: 2px;
  width: 16px;
}

.login .description {
  color: var(--black-900-1a1a1a);
  flex: 1;
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
}

.login .description-2 {
  color: var(--system-blue-007aff);
  flex: 1;
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  text-align: right;
}

.login .primary-button {
  align-self: stretch;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}

.login .nav {
  align-self: stretch;
  background-color: var(--black-100-e5e5e5);
  height: 1px;
  position: relative;
  width: 100%;
}

.login .frame-6 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
  width: 100%;
}

.login .google-big-button {
  align-items: center;
  background-color: var(--black-800-333333);
  border-radius: 6px;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 10px 16px;
  position: relative;
}

.login .frame-7 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  justify-content: flex-end;
  position: relative;
}

.login .other-pay-method {
  height: 20px;
  position: relative;
  width: 20px;
}

.login .dis {
  color: var(--white-ffffff);
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.login .sign-up-offer {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
}

.login .description-3 {
  color: var(--black-900-1a1a1a);
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.login .description-4 {
  color: var(--system-blue-007aff);
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  text-align: right;
  white-space: nowrap;
  width: fit-content;
}

</style>