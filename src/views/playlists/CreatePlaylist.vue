<template>
  <form @submit.prevent="handleCreate">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleFileChange">
    <div class="error" v-if="fileError"> {{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')

        const handleCreate = () => {
            if (file.value) {
                fileError.value = null
            } else {
                fileError.value = 'Please select an image file.'
            }
        }

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

        return { title, description, handleCreate, handleFileChange, fileError }
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