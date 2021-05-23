import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    user:null,
    errors:null,
    loading:false
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    unsetUser(state){
      state.user = null
    },
    setErrors(state,payload){
      state.errors = payload
    },
    setLoading(state,payload){
      state.loading = payload
    }
  },
  actions: {
    async loginUser({commit},credentials){
      commit('setLoading',true)
      try {
        const req = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAd_XQ_G0eR-lLU4H2VuDY0lA7FESazgoI',{
          method:'POST',
          body:JSON.stringify({
            email:credentials.email,
            password:credentials.password,
            returnSecureToken: true,
          })
        })
        const userDb = await req.json()

        if(userDb.error){
          commit('setErrors',userDb.error.message)
          commit('setLoading',false)
          return
        }
        commit('setLoading',false)
        commit('setUser',userDb)
        commit('setErrors',null)
        router.push('/home')
        localStorage.setItem('userAuth',JSON.stringify(userDb))
      } catch (error) {
        console.log(error);
      }
    },
    async RegisterUser({commit},credentials){
      commit('setLoading',true)
      try {
        const req = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd_XQ_G0eR-lLU4H2VuDY0lA7FESazgoI',{
          method:'POST',
          body:JSON.stringify({
            email:credentials.email,
            password:credentials.password,
            returnSecureToken: true,
          })
        })
        const userDb = await req.json()

        if(userDb.error){
          commit('setErrors',userDb.error.message)
          commit('setLoading',false)
          return
        }

        commit('setUser',userDb)
        commit('setErrors',null)
        commit('setLoading',false)
        router.push('/home')
        localStorage.setItem('userAuth',JSON.stringify(userDb))
      } catch (error) {
        console.log(error);
      }
    },
    logOut({commit}){
      localStorage.removeItem('userAuth')
      commit('unsetUser')
      router.push('/')
    },
    pushCustomErrors({commit},error){
      commit('setErrors',error)
    },
    // changeStatusLoading({commit},status){
    //   commit('setLoading',status)
    // }
  },
  getters:{
    authUser(state){
      return !!state.user
    },
    errors(state){
      return state.errors
    },
    loading(state){
      return state.loading
    }
  },
  modules: {
  }
})
