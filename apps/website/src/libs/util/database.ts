import firebase from 'firebase/app';
require('firebase/database');
require('firebase/auth');
require('firebase/firestore');
const DatabaseConfig = require('../../config.json').firebase;
DatabaseConfig['apiKey'] = require('../../config.json').firebaseServerAPIKey;

if (firebase.apps.length === 0)
    firebase.initializeApp(DatabaseConfig)
export const database = firebase.database()
export const firestore = firebase.firestore();

export const auth = firebase.auth();
/* @author Alisamar Husain
*
* Standard Firebase/Firestore Export
* ---------------------------------
* Import the object by either
*   const db = require('./Database')
* or
*   import db from './Database';
*
* Use the object to get a database
* namespace by 'db.firebase.database()'
* Check the firebase docs for more.
*/
