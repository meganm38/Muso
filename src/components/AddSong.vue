<template>
    <button @click="toggleShowForm" v-if="!showForm">Add Songs</button>
    <div class="add-song" @submit.prevent="addSong" v-else>
        <form>
            <h4>Add a New Song</h4>
            <input type="text" placeholder="Song title" required v-model="title">
            <input type="text" placeholder="Artisit" required v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { updateDocument } from '../composables/deleteDocument'

export default {
    props: ["playlist"],
    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        const { updateError, updatePending, handleUpdate } = updateDocument("playLists", props.playlist.id)
        const addSong = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 10000000)
            }
            await handleUpdate({songs: [...props.playlist.songs, newSong]})
            title.value = ""
            artist.value = ""
        }

        const toggleShowForm = () => {
            showForm.value = !showForm.value
        }
        return { title, artist, addSong, toggleShowForm, showForm }
    }
}
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin-top: 40px;
    }
    form {
        max-width: 100%;
        text-align: left;
    }
</style>