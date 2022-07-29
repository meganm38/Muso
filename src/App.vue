<template>
  <NavbarVue/>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
  import NavbarVue from "./components/Navbar.vue";
  export default {
    components: {NavbarVue}
  }
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>
