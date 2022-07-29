<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="queryDocuments.length">
        <list-view-vue :playlists="queryDocuments"/>
    </div>
    <div v-else>
        <button @click="handleCreate">Create Playlists</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import getCollection from '../../composables/getCollection'
import getUser from '../../composables/getUser'

import ListViewVue from '../../components/ListView.vue'
export default {
    components: { ListViewVue },
    setup() {
        const router = useRouter()
        const { getQueryDocuemnts, queryDocuments } = getCollection("playLists")
        const { currentUser } = getUser()
        onMounted(async () => {
            await getQueryDocuemnts({arg1: "userId", arg2: "==", arg3: currentUser.value.uid})
        })

        const handleCreate = () => {
            router.push({ name: "CreatePlaylist"})
        }
        return { queryDocuments, handleCreate }
    }
}
</script>

<style scoped>
    button {
        margin-top: 16px;
    }
</style>