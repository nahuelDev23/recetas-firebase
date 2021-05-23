<template>
 <form @submit.prevent="sendRecipe()">
    <legend class="text-center">Agregar Receta</legend>
    <ErrorsRecipe/>
    <Inputs :recipe='recipe' @checkTitleAndCategory='checkTitleAndCategory'/>
    <BtnCheckDisableNewRecipe text="Guardar" :disabled="disabled"  class="w-full"/>
  </form>
</template>

<script>
import Inputs from '../components/Inputs';
import BtnForm from "../components/BtnForm.vue";
const shortid = require("shortid");
import { mapActions } from "vuex";
import ErrorsRecipe from '../components/ErrorsRecipe.vue';
import BtnCheckDisableNewRecipe from '../components/BtnCheckDisableNewRecipe.vue';
export default {
  name:"AddRecipe",
  components: { BtnForm, Inputs, ErrorsRecipe, BtnCheckDisableNewRecipe },
  data() {
    return {
      disabled:true,
     recipe: {
        id: "",
        title: "",
        description: "",
        categories: [],
        ingredients: [
          {
            name: "",
          },
        ],
        steps: [
          {
            name: "",
          },
        ],
      },
    }
  },
 
    methods: {
    ...mapActions(["pushNewRecipe","pushCustomErrors"]),
    checkTitleAndCategory(){
      console.log('ok');
      if(this.recipe.title.trim() !== '' && this.recipe.categories.length > 0){
        this.disabled = false 
      }else{
         this.disabled = true 
      }
    },
    sendRecipe() {
      if(this.recipe.title.trim() === ''){
        this.pushCustomErrors('EMPTY_TITLE')
        return
      }
      if(this.recipe.categories.length === 0){
        this.pushCustomErrors('EMPTY_CATEGORY')
        return
      }
     this.pushCustomErrors(null)
      this.recipe.id = shortid.generate();
      this.pushNewRecipe(this.recipe);
      this.recipe = {
          id: "",
        title: "",
        description: "",
        categories: [],
        ingredients: [
          {
            name: "",
          },
        ],
        steps: [
          {
            name: "",
          },
        ],
      }
    },
    
  },
 
}
</script>

<style>

</style>