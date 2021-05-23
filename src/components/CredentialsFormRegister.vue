<template>
 <form class="flex flex-col text-center" @submit.prevent="login">
    <input class="mt-4 mb-2 rounded p-2 focus:outline-none" type="text" placeholder="Email" v-model="formRegister.email" />
    <input class="mb-2 rounded p-2 focus:outline-none" type="password"  placeholder="Contrasena" v-model="formRegister.password1" @keyup="validatePasswordCoincidence"/>
    <input class="mb-2 rounded p-2 focus:outline-none" type="password"  placeholder="Contrasena" v-model="formRegister.password2" @keyup="validatePasswordCoincidence"/>
    <BtnForm :text="'Registrar'" @send="submitFormRegister" :coincidencePassword="coincidencePassword"/>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BtnForm from './BtnForm'
export default {
    name:'CredentialsFormRegister',
    components:{
        BtnForm
    },
    data() {
        return {
            coincidencePassword:true,
            formRegister:{
                email : '',
                password1:'',
                password2:'',
            }
        }
    },
    
    methods: {
        ...mapActions(['pushCustomErrors','RegisterUser']),

        validateWidthPassword(){
            if(this.formRegister.password1 && this.formRegister.password2 > 6){
                return true
            }
            this.pushCustomErrors('ERROR_WIDTH_PASSWORD')
            return false
        },
        validatePasswordCoincidence(){
            if(this.formRegister.password1 === this.formRegister.password2){
                this.coincidencePassword = false
            }else{
                this.coincidencePassword = true
            }
        },
        submitFormRegister() {
            this.validateWidthPassword()
            this.RegisterUser({email:this.formRegister.email,password:this.formRegister.password1})
        }
    },
}
</script>

<style>

</style>