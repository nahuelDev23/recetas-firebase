<template>
    <div  v-if='errors === "INVALID_EMAIL" ' class='bg-red-200 p-2 rounded text-center mt-2'>Debe ingresar un email valido</div>
    <div v-else-if='errors === "EMAIL_NOT_FOUND" ' class='bg-red-200 p-2 rounded text-center mt-2'>Ese email no  existe</div>
    <div v-else-if='errors === "MISSING_PASSWORD" ' class='bg-red-200 p-2 rounded text-center mt-2'>Debe escribir un password</div>
    <div v-else-if='errors === "INVALID_PASSWORD" ' class='bg-red-200 p-2 rounded text-center mt-2'>Hubo un error con su password</div>
     <div v-else-if='errors === "ERROR_WIDTH_PASSWORD"' class='bg-red-200 p-2 rounded text-center mt-2'>El password no puede tener menos de 6 caracteres</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'ErrorsLogin',
    computed: {
        ...mapGetters(['errors'])
    },
}
</script>

<style>

</style>