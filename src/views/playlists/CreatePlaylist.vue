<template>
  <form @submit.prevent="handleCreate">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" required @change="handleFileChange">
    <div class="error" v-if="fileError"> {{ fileError }}</div>
    <button v-if="!uploadImagePending && !dbPending">Create</button>
    <button v-else disabled>Creating</button>
    <!-- errors -->
    <div class="error" v-if="uploadError">{{ uploadError }}</div>
    <div class="error" v-if="dbError">{{ dbError }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../../composables/useStorage.js'
import useCollection from '../../composables/useCollection.js'
import getUser from '../../composables/getUser'
import { serverTimestamp } from "firebase/firestore";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')

        const { uploadError, url, filePath, uploadImage, uploadImagePending } = useStorage()
        const { dbError, addDocToDb, dbPending } = useCollection("playLists")
        const { currentUser } = getUser()

        // Uploads playlist
        const handleCreate = async () => {
            if (file.value) {
                fileError.value = null
                await uploadImage(file.value)
                const docRef = await addDocToDb({
                    title: title.value,
                    description: description.value,
                    userId: currentUser.value.uid,
                    userName: currentUser.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: serverTimestamp()
                })
                if (!uploadError.value && !dbError.value) {
                    console.log("successful upload")
                    router.push({ name: 'PlaylistDetails', params: { id: docRef.id}})
                }
            } else {
                fileError.value = 'Please select an image file.'
            }
        }

        // User selects file
        const allowedTypes = ['image/png', 'image/jpeg']
        const handleFileChange = (e) => {
            const selected = e.target.files[0]

            if (selected && allowedTypes.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file.'
            }
        }

        return { title, description, handleCreate, handleFileChange, fileError, uploadError, uploadImagePending, dbError, dbPending }
    }
}
</script>

<style scoped>
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>