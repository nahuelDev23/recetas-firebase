import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import AddRecipe from '../views/AddRecipe.vue'
import RecipeDetails from '../views/RecipeDetails.vue'
import EditRecipe from '../views/EditRecipe.vue'

import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{authorized:true}
  },
  {
    path: '/addRecipe',
    name: 'AddRecipe',
    component: AddRecipe,
    meta:{authorized:true}
  },
  {
    path: '/recipeDetails/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
    props:true,
    meta:{authorized:true}
  },
  {
    path: '/editRecipe/:id',
    name: 'EditRecipe',
    component: EditRecipe,
    props:true,
    meta:{authorized:true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.authorized){
    if(store.getters.authUser){
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }
})
export default router
