<template>
      <input
      type="text"
      class="p-2 w-full rounded shadow mt-2"
      v-model="recipe.title"
      name="title"
      placeholder="Nombre de la receta"
      @keyup="this.$emit('checkTitleAndCategory')"
    />
    <input
      type="text"
      class="p-2 w-full rounded shadow mt-2"
      v-model="recipe.description"
      name="description"
      placeholder="Agrega una descripcion (opcional)"
    />
    <label class="mt-4 flex items-center" for="almuerzo">
      <span>Almuerzo</span>
      <input
        type="checkbox"
        id="almuerzo"
        value="Almuerzo"
        v-model="recipe.categories"
         @change="this.$emit('checkTitleAndCategory')"
      />
    </label>
    <label class="mt-4 flex items-center" for="merienda">
      <span>Merienda</span>
      <input
        type="checkbox"
        id="merienda"
        value="Merienda"
        v-model="recipe.categories"
      />
    </label>
    <label class="mt-4 flex items-center" for="cena">
      <span>Cena</span>
      <input
        type="checkbox"
        id="cena"
        value="Cena"
        v-model="recipe.categories"
      />
    </label>
    <label class="mt-4 flex items-center" for="desayuno">
      <span>Desayuno</span>
      <input
        type="checkbox"
        id="desayuno"
        value="Desayuno"
        v-model="recipe.categories"
      />
    </label>
    <label class="mt-4 flex items-center" for="ideas">
      <span>Ideas</span>
      <input
        type="checkbox"
        id="ideas"
        value="Ideas"
        v-model="recipe.categories"
      />
    </label>

    <div
      class="flex items-center"
      v-for="(ingredients, index) in recipe.ingredients"
      :key="index"
    >
      <input
        class="p-2 w-full rounded rounded-r-none shadow mt-2"
        type="text"
        v-model="ingredients.name"
        name="ingredients"
        :placeholder="`Ingrediente #${index + 1}`"
        
      />
      <div
        class="bg-gray-500 p-2 mt-2 rounded rounded-l-none shadow text-white"
      >
        <span
          class="input-group-text"
          @click="removeInputIngredient(index)"
          v-show="index || (!index && recipe.ingredients.length > 1)"
          >Menos</span
        >
        <span
          @click="addInputIngredient()"
          v-show="index == recipe.ingredients.length - 1"
          >Mas</span
        >
      </div>
    </div>

    <button
      @click="stepsInputs = !stepsInputs"
      :class="activateOrDisableStep"
      class="mt-4 mb-2 p-2 rounded block"
    >
      Agregar pasos
    </button>

    <div
      v-show="stepsInputs"
      class="flex items-center mb-2"
      v-for="(steps, index) in recipe.steps"
      :key="index"
    >
      <input
        class="p-2 w-full rounded rounded-r-none shadow mt-2"
        type="text"
        v-model="steps.name"
        name="steps"
        :placeholder="`Paso #${index + 1}`"
        
      />
      <div
        class="bg-gray-500 p-2 mt-2 rounded rounded-l-none shadow text-white"
      >
        <span
          class="input-group-text"
          @click="removeInputStep(index)"
          v-show="index || (!index && recipe.steps.length > 1)"
          >Menos</span
        >
        <span @click="addInputStep()" v-show="index == recipe.steps.length - 1"
          >Mas</span
        >
      </div>
    </div>
</template>

<script>
export default {
    name:'Inputs',
    props:['recipe'],
    emits: ["checkTitleAndCategory"],
    data() {
    return {
      stepsInputs: false,
      
    };
  },
  computed: {
    activateOrDisableStep() {
      if (this.stepsInputs) {
        return "bg-purple-500 text-white";
      } else {
        return "bg-gray-200";
      }
    },
  },
  methods: {
     addInputIngredient() {
      this.recipe.ingredients.push({ name: "" });
    },
    removeInputIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInputStep() {
      this.recipe.steps.push({ name: "" });
    },
    removeInputStep(index) {
      this.recipe.steps.splice(index, 1);
    },
    checkIfInEditRequestHaveSteps(){
      if(this.recipe.steps.length > 1){
        this.stepsInputs = true
        
      }
    }
  },
  created(){
    this.checkIfInEditRequestHaveSteps()
  }
}
</script>

<style>

</style>