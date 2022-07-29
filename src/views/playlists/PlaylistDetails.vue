<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document" class="playlist-details">
    
    <div class="playlist-info">
        <div class="cover">
            <img :src="document.coverUrl">
        </div>
        <h2>{{ document.title }}</h2>
        <p class="username">Created by {{ document.userName }}</p>
        <p class="description">{{ document.description }}</p>
        <button v-if="belongsToCurrentUser && !deletePending" @click="deletePlaylist">Delete playlist</button>
        <button v-if="belongsToCurrentUser && deletePending" disabled>Deleting</button>
        <div class="error" v-if="deleteError"> {{ deleteError }}</div>
    </div>

    <div class="song-list">
        <div v-if="!document.songs.length">No songs have been added to this playlist yet.</div>
        <div class="single-song" v-for="song in document.songs" :key="song.id">
            <div class="details">
                <h3>{{ song.title }}</h3>
                <p>{{ song.artist }}</p>
            </div>
            <button v-if="belongsToCurrentUser" @click="deleteSong(song.id)">delete</button>
        </div>
        <AddSong v-if="belongsToCurrentUser" :playlist="document"/>
    </div>
  </div>
</template>

<script>
import getDocument from '../../composables/getDocument'
import getUser from '../../composables/getUser'
import {deleteDocument, updateDocument} from '../../composables/deleteDocument'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

import AddSong from "../../components/AddSong.vue"

export default {
    props: ["id"],
    components: { AddSong },
    setup(props) {
        const router = useRouter()
        const { error, document } = getDocument("playLists", props.id)
        const { currentUser } = getUser()
        
        const belongsToCurrentUser = computed(() => {
            return currentUser.value.uid === document.value.userId
        })

        const { deleteError, deletePending, handleDelete } = deleteDocument("playLists", props.id)
        const deletePlaylist = async () => {
            await handleDelete()
            router.push('/')
        }


        const { handleUpdate } = updateDocument("playLists", props.id)

        const deleteSong = async (songId) => {
            const currentSongs = document.value.songs
            const newSongs = currentSongs.filter(song => song.id != songId)
            handleUpdate({
                songs: [...newSongs]
            })
        }
        
        return { error, document, belongsToCurrentUser, deletePlaylist, deleteError, deletePending, deleteSong }
    }
}
</script>

<style>
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
    }
    .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }
    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .playlist-info p {
        margin-bottom: 20px;
    }
    .username {
        color: #999;
    }
    .description {
        text-align: center;
    }
    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
</style>