"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="dom" />
const firebase = __importStar(require("firebase"));
require('firebase/database');
require('firebase/auth');
require('firebase/firestore');
require('dotenv').config();
const DatabaseConfig = require('../../assets/config.json').firebase;
DatabaseConfig['apiKey'] = process.env.FIREBASE_APIKEY;
if (firebase.apps.length === 0)
    firebase.initializeApp(DatabaseConfig);
exports.Realtime = firebase.database();
exports.Firestore = firebase.firestore();
// export const Auth = firebase.auth()
exports.default = exports.Firestore;
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
//# sourceMappingURL=Database.js.map