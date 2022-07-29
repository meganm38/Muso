<template>
  <form @submit.prevent="handleLogin">
    <h1>Login</h1>
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <p class="error" v-if="error">{{ error }}</p>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'
export default {
    setup() {
        const { error, login } = useLogin()
        const email = ref('')
        const password = ref('')

        const handleLogin = async () => {
            await login(email.value, password.value)
            console.log('user logged in')
        }

        return { error, handleLogin, email, password }
    }
}
</script>

<style>

</style>