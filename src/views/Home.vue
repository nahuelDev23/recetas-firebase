<template>
  <BtnAddRecipe/>
  <ListRecipes/>
  
</template>

<script>
import { mapActions } from 'vuex'
import BtnAddRecipe from '../components/BtnAddRecipe.vue'
import ListRecipes from '../components/ListRecipes.vue'

export default {
  name: 'Home',
  components: {
    BtnAddRecipe,
    ListRecipes
  },
  
  methods: {
   ...mapActions(['loadLocalStorage'])
  },
  created(){
    this.loadLocalStorage()
  }
}
</script>
