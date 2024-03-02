import Vue from 'vue'
import VueRouter from 'vue-router'

import { BASE_URL } from '@/config'

import routes from './routes'
console.log(process.env, BASE_URL)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes
})

export default router
