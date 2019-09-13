/// <reference lib="dom" />
import * as firebase from 'firebase'

require('firebase/database')
require('firebase/auth')
require('firebase/firestore')
require('dotenv').config()

const DatabaseConfig = require('../../assets/config.json').firebase
DatabaseConfig['apiKey'] = process.env.FIREBASE_APIKEY

if(firebase.apps.length === 0)
  firebase.initializeApp(DatabaseConfig)

export const Realtime = firebase.database()
export const Firestore = firebase.firestore()
// export const Auth = firebase.auth()

export default Firestore
/* @author Alisamar Husain
*
* Standard Firebase/Firestore Export
* ---------------------------------
* Import the object by either
*   const db = require('./Database')
* or
*   import db from './Database'
*
* Use the object to get a database
* namespace by 'db.firebase.database()'
* Check the firebase docs for more.
*/
