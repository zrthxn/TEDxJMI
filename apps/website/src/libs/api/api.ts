import axios from 'axios'
const config = require('../config.json')

export class APIService {
  request = axios

  protected auth = {
    csrf: {
      token: null
    },
    headers: {
      'X-Access-Key': null,
      'X-Access-Token': null
    }
  }

  protected endpoint = String()

  constructor() {
    this.setEndpoint(config.endpoints.backend)
  }

  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  setEndpoint(setUrl:string) {
    this.endpoint = setUrl

    this.authenticate().then((auth)=>{
      this.auth.csrf.token = auth.csrfToken
      this.auth.headers = {
        'X-Access-Key': auth.key,
        'X-Access-Token': auth.authToken
      }

      this.request.create({
        baseURL: this.endpoint,
        timeout: 5000
      })
      
      this.request.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error.response)
      )

      this.request.interceptors.request.use(config => {
        config.headers.post['X-Access-Key'] = this.auth.headers["X-Access-Key"]
        config.headers.post['X-Access-Token'] = this.auth.headers["X-Access-Token"]
        // config.headers.com['X-Access-Key'] = this.auth.csrf.token
        return config
      })
    })
  }

  async authenticate() {
    const authResponse = await this.request.post(
      this.endpoint + '/_authenticate', {
        apiKey: config.clientAPIKey
      }
    )
    
    return authResponse.data
  }

  getEndpoint() { 
    return this.endpoint
  }

  async validate() {
    return this.request.get(
      this.endpoint + '/', {
        headers: this.auth.headers
      }
    )
  }

  async registerUser(userdata:any) {
    return this.request.post(
      this.endpoint + '/_register/user', {
        userdata
      }
    ) 
  }
  
  async registerTicket(data:any) {
    return this.request.post(
      this.endpoint + '/_register/ticket', {
        data
      }
    ) 
  }

  async createPayment(data:any) {
    return this.request.post(
      this.endpoint + '/_payments/create', {
        data
      }
    ) 
  }

  async refundPayment() {
    return this.request.post(
      this.endpoint + '/_payments/refund', {
        
      }
    ) 
  }
}
