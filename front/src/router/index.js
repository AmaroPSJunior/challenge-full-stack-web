import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  // { path: '/cadastro', name: 'Home', component: Home },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // divisão de código de nível de rota
  //   // isso gera um trecho separado (cerca de. [hash] .js) para esta rota
  //   // que é carregado lentamente quando a rota é visitada.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
