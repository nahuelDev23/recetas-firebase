<template>
   <button type="submit" :disabled="disabled"  :class="disabledBtn" class="rounded focus:outline-none p-2 font-bold spacing-4 text-gray-600" >
       <div v-if="!loading">{{text}}</div>
       <div v-else><i class="fas fa-circle-notch fa-spin"></i></div>
    </button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:"BtnCheckDisableNewRecipe",
    props:['text','disabled'],
    computed: {
        ...mapGetters(['loading']),
        disabledBtn() {
            if(this.disabled){
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