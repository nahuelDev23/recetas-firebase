<template>
   <button :disabled="coincidencePassword" @click="this.$emit('send')" :class="disabledBtn" class="rounded focus:outline-none p-2 font-bold spacing-4 text-gray-600" >
       <div v-if="!loading">{{text}}</div>
       <div v-else><i class="fas fa-circle-notch fa-spin"></i></div>
    </button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:"BtnForm",
    props:['text','send','coincidencePassword'],
    computed: {
        ...mapGetters(['loading']),
        disabledBtn() {
            if(this.coincidencePassword){
                return 'bg-gray-300'
            }else{
                return 'bg-purple-300'
            }
            
        }
    },
}
</script>

<style>

</style>