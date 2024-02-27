import { DEFAULT_VIEW_NAME } from '@/config'

const routes = [
  { path: '/', redirect: { name: DEFAULT_VIEW_NAME } },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('@/views/Init.vue')
  }
]

export default routes
