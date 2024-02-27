import { SECURE_HOST, API_HOST, API_BASE_PATH } from '@/config'

// Retrive API URL
export function getAPIHost() {
  return `http${SECURE_HOST ? 's' : ''}://${API_HOST}${API_BASE_PATH}`
}
