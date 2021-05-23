<template>
  <table class="w-full text-center mt-4">
    <tr>
      <th>Receta</th>
      <th>Acciones</th>
    </tr>
    <tr v-for="recipe in recipes" :key="recipe.id">
      <td>{{ recipe.title }}</td>
      <td class="flex justify-center p-1">
        <router-link class='bg-gray-200 p-1 mr-1 rounded' :to="`/recipeDetails/${recipe.id}`">ver</router-link>
        <router-link class='bg-gray-200 p-1 mr-1 rounded' :to="`/editRecipe/${recipe.id}`">editar</router-link>
        <router-link class='bg-gray-200 p-1 mr-1 rounded'  to="/">borrar</router-link>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ListRecipies",
  computed: {
    ...mapGetters(["recipes"]),
  },
};
</script>

<style>
</style>                                                                