import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    user: null,
    errors: null,
    loading: false,
    recipes:[],
    recipe: {
      id:'',
      title: '',
      description: '',
      categories: [],
      ingredients: [{
        name: ''
      }],
      steps: [{
        name: ''
      }],
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    unsetUser(state) {
      state.user = null
    },
    setErrors(state, payload) {
      state.errors = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setRecipes(state,payload){
      state.recipes.push(payload)
    },
    setOneRecipeForDetail(state,payload){
      state.recipe = payload
    },
    setAllRecipiesUser(state,payload){
      state.recipes  = payload
    },
    update(state,payload){
      state.recipes = state.recipes.map(item => item.id === payload.id ? payload : item)
    },
    delete(state,payload){
      state.recipes = state.recipes.filter(item => item.id !== payload)
    }
  },
  actions: {
    async loginUser({ commit }, credentials) {
      commit('setLoading', true)
      try {
        const req = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAd_XQ_G0eR-lLU4H2VuDY0lA7FESazgoI', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true,
          })
        })
        const userDb = await req.json()

        if (userDb.error) {
          commit('setErrors', userDb.error.message)
          commit('setLoading', false)
          return
        }
        commit('setLoading', false)
        commit('setUser', userDb)
        commit('setErrors', null)
        router.push('/home')
        localStorage.setItem('userAuth', JSON.stringify(userDb))
      } catch (error) {
        console.log(error);
      }
    },
    async RegisterUser({ commit }, credentials) {
      commit('setLoading', true)
      try {
        const req = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd_XQ_G0eR-lLU4H2VuDY0lA7FESazgoI', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            returnSecureToken: true,
          })
        })
        const userDb = await req.json()

        if (userDb.error) {
          commit('setErrors', userDb.error.message)
          commit('setLoading', false)
          return
        }

        commit('setUser', userDb)
        commit('setErrors', null)
        commit('setLoading', false)
        router.push('/home')
        localStorage.setItem('userAuth', JSON.stringify(userDb))
      } catch (error) {
        console.log(error);
      }
    },
    logOut({ commit }) {
      localStorage.removeItem('userAuth')
      commit('unsetUser')
      router.push('/')
    },
    pushCustomErrors({ commit }, error) {
      commit('setErrors', error)
    },
    async loadLocalStorage({ commit, state }) {
      if (localStorage.getItem('userAuth')) {
        localStorage.setItem('userAuth', JSON.parse(localStorage.getItem('userAuth')))
      } else {
        return commit('userAuth', null)
      }
    
      try {
        const req = await fetch(`https://recetas-bb9c7-default-rtdb.firebaseio.com/recipes/${state.user.localId}.json?auth=${state.user.idToken}`)
        const res = await req.json() 
        const arrayRecipes = []
        for(let id in res){
          
          arrayRecipes.push(res[id]);
        }
        commit('setAllRecipiesUser',arrayRecipes)
      } catch (error) {
        console.log(error);
      }
    },
    async pushNewRecipe({commit,state},recipe){
      try {
        const req = await fetch(`https://recetas-bb9c7-default-rtdb.firebaseio.com/recipes/${state.user.localId}/${recipe.id}.json?auth=${state.user.idToken}`,{
          method:'PUT',
          headers:{
            'Conten-type':'application/json'
          },
          body:JSON.stringify(recipe)
        })
        const res = await req.json()
        router.push('/home')
      } catch (error) {
        console.log(error);
      }
      commit('setRecipes',recipe)
    },
    /**
     * getOneRecipeForDetail
     * para detalles o edicion
     */
    getOneRecipeForDetail({commit,state},id){
      const req = state.recipes.find(item => item.id === id)
      commit('setOneRecipeForDetail',req)
    },
    async updateRecipe({commit,state},recipe){
      try {
        const req = await fetch(`https://recetas-bb9c7-default-rtdb.firebaseio.com/recipes/${state.user.localId}/${recipe.id}.json?auth=${state.user.idToken}`,{
          method:'PATCH',
          body:JSON.stringify(recipe)
        })
        const res = await req.json();
        
        commit('update',res)
        router.push('/home')
      } catch (error) {
          console.log(error);
      }
    },
    async deleteRecipe({commit,state},id){
      try {
        fetch(`https://recetas-bb9c7-default-rtdb.firebaseio.com/recipes/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
          method:'DELETE'
        })
        commit('delete',id)
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    authUser(state) {
      return !!state.user
    },
    errors(state) {
      return state.errors
    },
    loading(state) {
      return state.loading
    },
    recipes(state) {
      return state.recipes
    },
    recipeDetail(state){
      return state.recipe
    }
  },
  modules: {
  }
})
