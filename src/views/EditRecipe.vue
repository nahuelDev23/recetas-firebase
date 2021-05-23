<template>
{{recipeDetail}}
   <form @submit.prevent="update()">
    <legend class="text-center">Editar Receta</legend>
    <ErrorsRecipe/>
    <Inputs :recipe='recipeDetail'  @checkTitleAndCategory='checkTitleAndCategory'/>
    <BtnCheckDisableNewRecipe text="Guardar" :disabled="disabled" class="w-full" /> 
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Inputs from '../components/Inputs';
import BtnCheckDisableNewRecipe from "../components/BtnCheckDisableNewRecipe.vue";
import ErrorsRecipe from '../components/ErrorsRecipe.vue';
export default {
  name:'EditRecipe',
  props:['id'],
  components: { BtnCheckDisableNewRecipe, Inputs, ErrorsRecipe },
  computed: {
    ...mapGetters(['recipeDetail'])
  },
  data() {
    return {
      disabled: true
    }
  },
  methods:{
    ...mapActions(['getOneRecipeForDetail','updateRecipe','pushCustomErrors']),
    checkTitleAndCategory(){
      console.log('ok');
      if(this.recipeDetail.title.trim() !== '' && this.recipeDetail.categories.length > 0){
        this.disabled = false 
      }else{
         this.disabled = true 
      }
    },
    async update(){
       if(this.recipeDetail.title.trim() === ''){
        this.pushCustomErrors('EMPTY_TITLE')
        return
      }
      if(this.recipeDetail.categories.length === 0){
        this.pushCustomErrors('EMPTY_CATEGORY')
        return
      }
      await this.updateRecipe(this.recipeDetail)
    }
  },
  created(){
    this.getOneRecipeForDetail(this.id)
  }
}
</script>
    

<style>

</style>