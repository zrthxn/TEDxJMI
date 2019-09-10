import axios from 'axios'
import crypto from 'crypto'
import { UserModel, TransactionModel } from '../../Models'
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
    const LOCK = crypto.randomBytes(32).toString('base64')
    var APIKEY = ''

    if(process.env.REACT_APP_CLIENT_KEY!==undefined)
      APIKEY = crypto.createHmac('sha256', LOCK).update(process.env.REACT_APP_CLIENT_KEY).digest('base64')

    try {
      let authResponse = await this.request.post(
        this.endpoint + '/_authenticate', {
          clientId: LOCK, apiKey: APIKEY
        }
      )
      
      let { key, token } = authResponse.data
      localStorage.setItem('tedxjmi:X-Request-Validation', key)
      localStorage.setItem('tedxjmi:Authorization', token)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  getEndpoint = () => this.endpoint
  
  async registerTicket(user:UserModel, txn:TransactionModel) {
    const checksum = crypto.createHash('sha512').update(JSON.stringify(user)).update(JSON.stringify(txn)).digest('base64')
    return this.request.post(
      this.endpoint + '/_register/ticket', {
        user, txn, checksum
      }
    ) 
  }

  async createPayment(user:UserModel) {
    return this.request.post(
      this.endpoint + '/_payments/create', {
        user
      }
    ) 
  }
}
