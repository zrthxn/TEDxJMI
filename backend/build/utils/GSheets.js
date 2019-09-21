"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = './util/GoogleAPIs/Sheets/credentials.json';
const TOKEN_PATH = './util/GoogleAPIs/Sheets/token.json';
class GSheets {
    constructor() {
        this.SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        this.CREDENTIALS_PATH = './auth/credentials.json';
        this.TOKEN_PATH = './auth/Tokens/gsheets.json';
        this.TestGSheets = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Testing Sheets API');
            try {
                const auth = yield this.authorize();
                const testObj = googleapis_1.google.sheets({ version: 'v4', auth });
                if (testObj != null)
                    return ({ success: true });
            }
            catch (err) {
                return Promise.reject({ success: false, errors: err });
            }
        });
        this.AppendToSpreadsheet = (payload) => {
            return new Promise((resolve, reject) => {
                let results = [], errors = [];
                this.authorize().then((auth) => {
                    payload.forEach(entry => {
                        googleapis_1.google.sheets({ version: 'v4', auth }).spreadsheets.values.append({
                            spreadsheetId: entry.ssId,
                            range: entry.sheet,
                            valueInputOption: 'RAW',
                            insertDataOption: 'INSERT_ROWS',
                            // resource: {
                            //   majorDimension: "ROWS",
                            //   values: [entry.values]
                            // },
                            auth: auth
                        }, function (err, response) {
                            if (!err) {
                                results = [...results, response];
                                console.log("Spreadsheet Payload Delivered");
                            }
                            else {
                                errors = [...errors, err];
                                console.log(errors);
                            }
                        });
                    });
                    resolve(results, errors);
                }).catch((err) => {
                    reject(err);
                });
            });
        };
    }
    authorize() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.CREDENTIALS_PATH, (err, content) => {
                if (err)
                    return console.log('Error loading client secret file:', err);
                const credentials = JSON.parse(content.toString());
                const { client_secret, client_id, redirect_uris } = credentials.installed;
                const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                fs_1.default.readFile(this.TOKEN_PATH, (e, token) => {
                    if (e) {
                        this.getNewToken(oAuth2Client).then((auth) => {
                            resolve(auth);
                        });
                    }
                    else {
                        oAuth2Client.setCredentials(JSON.parse(token));
                        resolve(oAuth2Client);
                    }
                });
            });
        });
    }
    getNewToken(oAuth2Client) {
        return new Promise((resolve, reject) => {
            const rlx = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
            rlx.question('Invalid or no token found. Generate new? (Y/N)...', (code) => {
                if (code === 'Y' || code === 'y') {
                    const authUrl = oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: this.SCOPES,
                    });
                    console.log('Authorization URL:', authUrl);
                    const rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
                    rl.question('Validation code: ', (auth) => {
                        rl.close();
                        oAuth2Client.getToken(auth, (err, token) => {
                            if (err)
                                return console.error('Error retrieving access token', err);
                            oAuth2Client.setCredentials(token);
                            fs_1.default.writeFile(this.TOKEN_PATH, JSON.stringify(token, null, 2), (e) => {
                                if (e)
                                    return reject(e);
                                console.log('Token stored to', this.TOKEN_PATH);
                                resolve(oAuth2Client);
                            });
                        });
                    });
                }
            });
        });
    }
}
exports.default = GSheets;
//# sourceMappingURL=GSheets.js.map