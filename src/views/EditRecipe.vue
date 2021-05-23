<template>
  <FormRecipe :recipes='recipeDetail'/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormRecipe from '../components/FormRecipe.vue'
export default {
  name:'EditRecipe',
  props:['id'],
  components:{
    FormRecipe
  },
  computed: {
    ...mapGetters(['recipeDetail'])
  },
  methods:{
    ...mapActions(['getOneRecipeForDetail'])
  },
  created(){
    this.getOneRecipeForDetail(this.id)
  }
}
</script>
    

<style>

</style>