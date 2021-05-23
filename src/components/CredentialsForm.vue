<template>
  <form class="flex flex-col text-center" @submit.prevent="login">
    <input class="mt-4 mb-2 rounded p-2 focus:outline-none" type="text" :class="errorEmailCss" placeholder="Email" v-model="formLogin.email" />
    <input class="mb-2 rounded p-2 focus:outline-none" type="password" :class="errorPasswordCss" placeholder="Contrasena" v-model="formLogin.password"/>
    <BtnForm :text="'Iniciar'" @send="submitFormLogin" />
  </form>
</template>

<script>
import BtnForm from "./BtnForm";
import { mapActions,mapGetters } from 'vuex'
export default {
  name: "CredetialsForm",
  components: {
    BtnForm,
  },
  computed: {
        ...mapGetters(['errors']),
        errorEmailCss(){
            if(this.errors != null){
                if(this.errors.includes('EMAIL')){
                    return 'border-red-500 border'
                }
            }
        },
         errorPasswordCss(){
            if(this.errors != null){
                if(this.errors.includes('PASSWORD')){
                    return 'border-red-500 border'
                }
            }
        },

    },
  data() {
      return {
          formLogin :{
              email:'',
              password:''
          }
      }
  },
  methods: {
      ...mapActions(['loginUser']),
    submitFormLogin() {
      this.loginUser({email:this.formLogin.email,password:this.formLogin.password})
      console.log(this.formLogin)
    },
  },
};
</script>

<style>
</style>