<template>
  <div class="home">
    <div v-if="documents">
       <ListView :playlists="documents"/>
    </div>
    <div class="error" v-if="error"> {{ error }}</div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView.vue'

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("playLists")
    return { error, documents }
  }
}
</script>

<style>
</style>
