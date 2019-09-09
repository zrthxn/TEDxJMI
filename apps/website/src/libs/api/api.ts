import axios from 'axios'
const config = require('../config.json')

export class APIService {
  protected endpoint = config.endpoints.backend

  private auth = {
    key: String(),
    token: String()
  }

  request = axios.create({
    baseURL: this.endpoint,
    timeout: 5000
  })

  constructor() {
    this.setEndpoint(config.endpoints.backend)

    let key = localStorage.getItem('tedxjmi:X-Request-Validation')
    let token = localStorage.getItem('tedxjmi:Authorization')
    
    if(key!==null && token!==null) 
      this.auth = { key, token }

    this.request.interceptors.request.use((config)=>{
      config.xsrfHeaderName = 'X-Request-Validation'
      config.headers = {
        [config.xsrfHeaderName] : this.auth.key,
        Authorization: this.auth.token
      }
      return config
    })

    this.request.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error.response)
    )
  }

  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  setEndpoint(setUrl:string) {
    this.endpoint = setUrl
    
    this.request = axios.create({
      baseURL: this.endpoint,
      timeout: 5000
    })
  }

  async authenticate() {
    // Not real key
    const APIKEY = 'qWertT2uiOp2lkjhgfD5Sa2zxcvBn831'

    try {
      let authResponse = await this.request.post(
        this.endpoint + '/_authenticate', {
          apiKey: APIKEY
        }
      )
      
      let { key, token } = authResponse.data
      localStorage.setItem('tedxjmi:X-Request-Validation', key)
      localStorage.setItem('tedxjmi:Authorization', token)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  getEndpoint() { 
    return this.endpoint
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
