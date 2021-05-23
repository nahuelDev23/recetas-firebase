<template>
   <div>
        <h1 class="text-center mt-4 text-xl">Registrarme</h1>
        <ErrorsLogin/>
        <CredentialsFormRegister/>
    </div>
</template>

<script>
import CredentialsFormRegister from '../components/CredentialsFormRegister.vue'
import ErrorsLogin from '../components/ErrorsLogin.vue'
export default {
  components: { CredentialsFormRegister,ErrorsLogin },
    name:'Register'
}
</script>

<style>

</style>