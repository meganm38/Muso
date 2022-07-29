<template>
  <div class="navbar">
    <nav>
        <img src="../assets/tent.png" alt="">
        <h1><router-link :to="{ name: 'Home'}">Muso</router-link></h1>
        <div class="links">
            <div v-if="currentUser">
            <button @click="handleLogout">Logout</button>
            </div>
            <div v-else>
                <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const { logout } = useLogout()
        const handleLogout = async () => {
            await logout()
            console.log("user logged out")
            router.push({ name: 'Login'})
        }

        const { currentUser } = getUser()
        return { handleLogout, currentUser }
    }
}
</script>

<style scoped>
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 atuo;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
    img {
        max-height: 60px;
    }
</style>