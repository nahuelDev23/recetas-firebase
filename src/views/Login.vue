<template>
    <div>
        
        <h1 class="text-center mt-4 text-xl">Iniciar sesion</h1>
        <ErrorsLogin/>
        <CredentialsForm/>
    </div>
</template>

<script>

import CredentialsForm from '../components/CredentialsForm.vue'
import ErrorsLogin from '../components/ErrorsLogin.vue'
export default {
  components: { CredentialsForm, ErrorsLogin },
    name:'Login',
    
}
</script>

<style>

</style>