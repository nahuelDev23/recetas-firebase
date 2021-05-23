<template>
    <div  v-if='errors === "EMPTY_TITLE" ' class='bg-red-200 p-2 rounded text-center mt-2'>Debe ingresar un titulo para la receta</div>
    <div v-else-if='errors === "EMPTY_CATEGORY" ' class='bg-red-200 p-2 rounded text-center mt-2'>Debe elegir al menos una categoria</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'ErrorsRecipe',
    computed: {
        ...mapGetters(['errors'])
    },
}
</script>

<style>

</style>