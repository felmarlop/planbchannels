const routes = [
  { path: '', redirect: { name: 'main' } },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue')
  }
]

export default routes
