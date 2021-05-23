<template>
  <h1 class="text-center mb-2">{{recipeDetail.title}}</h1>
  <div class="text-center">
      <span class="bg-purple-300 mr-2 p-1 rounded text-white " v-for="category in recipeDetail.categories" :key="category.id">{{category}}</span>
  </div>
  <div class="text-center mt-4">
      {{recipeDetail.description}}
  </div>
  <div class="mt-4">Ingredientes</div>
  <ol class="list-disc pl-4" v-for="(ingredient,index) in recipeDetail.ingredients" :key="index">
      <li @click="completed" >{{ingredient.name}}</li>
  </ol>
  <div class="mt-4">Pasos</div>
  <div v-if="recipeDetail.ingredients != null">
      <ol class="list-disc pl-4" v-for="step in recipeDetail.steps" :key="step.id">
        <li @click="completed"> {{step.name}}</li>
    </ol>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'RecipeDetails',
    props:['id'],
   
    computed: {
       ...mapGetters(['recipeDetail']),
    },
    methods: {
        ...mapActions(['getOneRecipeForDetail']),
        completed(event){
            event.target.classList.toggle('line-through')
        }
        
    },
    created(){
        this.getOneRecipeForDetail(this.id)
    }
}
</script>

<style>

</style>