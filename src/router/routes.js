const routes = [
  { path: '', redirect: { name: 'channels' } },
  {
    path: '/',
    name: 'channels',
    component: () => import('@/views/Channels.vue')
  }
]

export default routes
