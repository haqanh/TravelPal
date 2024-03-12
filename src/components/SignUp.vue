<template>
<div>
    <h1> Sign Up </h1>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signUp"> Sign Up </button>
    <p> Already have an account? <router-link to="/login"> Sign In </router-link> </p>
</div>
</template>

<script>
    import firebaseApp from "@/firebase";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

    export default {
        name: "SignUp",
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            signUp() {
                const auth = getAuth(firebaseApp);
                createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }
}

    
</script>

<style>

</style>