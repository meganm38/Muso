<template>
  <form @submit.prevent="handleSignup">
    <h1>Sign up</h1>
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <p class="error" v-if="error">{{ error }}</p>
    <button>Sign  up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '../../composables/useSignup'
import { useRouter} from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const { error, signup } = useSignup()
        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSignup = async () => {
            await signup(email.value, password.value, displayName.value)
            router.push('/')
        }

        return { error, handleSignup, email, password, displayName }
    }
}
</script>

<style>

</style>