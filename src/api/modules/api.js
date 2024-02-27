import axios from 'axios'
import { getAPIHost } from '@/helpers/env'

/*
   Default API class that creates axios instance
*/
export default class API {
  constructor() {
    this.request = axios.create({
      baseURL: getAPIHost()
    })
  }

  async list(params = {}) {
    return await this.request.get(this.path, { params })
  }

  async refreshViews() {
    return await this.request.put('/refresh-song-views/')
  }
}
