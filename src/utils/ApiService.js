const axios = require('axios')

export default class ApiService {
  constructor (url, params = {}) {
    this.url = url
    this.params = params
  }

  async get () {
    try {
      return await axios.get(this.url)
    } catch (error) {
      console.error(error)
    }
  }
}
