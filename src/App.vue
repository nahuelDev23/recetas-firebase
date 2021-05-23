<template>
  <div class=" p-4">
    <div id="nav">
      <router-link v-if="!authUser" to="/">Iniciar Sesion</router-link> 
      <router-link v-if="!authUser" to="/Register">Registrarme</router-link>
      <router-link v-if="authUser" to="/Home">Home</router-link>
      <button v-if="authUser" @click="logOut">Salir</button>
    </div>
    <div class="container mx-auto">
      <router-view />
    </div>

  </div>
</template>

<style lang="scss">
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name:'App',
  computed: {
   ...mapGetters(['authUser'])
  },
  methods: {
    ...mapActions(['logOut'])
  },
}
</script>
