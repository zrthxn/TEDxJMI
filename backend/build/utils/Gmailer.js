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
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
// import LoadBalancer from './LoadBalancer'
const GmailConfig = require('../../assets/config.json').gmailer;
class Gmailer {
    constructor() {
        this.SCOPES = ['https://mail.google.com'];
        this.CREDENTIALS_PATH = './auth/credentials.json';
        this.TOKEN_PATH = './auth/Tokens/gmailer.json';
        this.TestGmailer = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Testing GMail API');
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
        this.DistributedCampaign = function (mail, content, database, options) {
            const MAX_DATA = 50;
            var payload = [];
            let data_rows = database.split('\r\n');
            let head = data_rows[0];
            let count = Math.floor((data_rows.length - 1) / MAX_DATA) + 1;
            for (let i = 0; i < count; i++) {
                let data = '';
                for (let j = MAX_DATA * i + 1; j <= (i + 1) * MAX_DATA; j++) {
                    if (data_rows[j] === undefined)
                        break;
                    data += ('\r\n' + data_rows[j]);
                }
                payload.push({
                    mail: mail,
                    content: content,
                    data: head + data
                });
            }
            // LoadBalancer.deployNewInstance('./EmailDistributionWorker.ts', count, payload, 'free')
        };
        this.sendFrequency = 1000;
        this.MultipartSepartor = `====X__multipart-000000${Date.now().toString(16)}__X====`;
        this.Head =
            'Mime-Version: 1.0\r\n' +
                'Content-Type: multipart/alternative; boundary=\"' + this.MultipartSepartor + '\"\r\n' +
                'Content-Transfer-Encoding: binary\r\n' +
                'X-Mailer: MIME::Lite 3.030 (F2.84; T1.38; A2.12; B3.13; Q3.13)\r\n\r\n' +
                '--' + this.MultipartSepartor + '\r\n' +
                'Content-Transfer-Encoding: binary\r\n' +
                'Content-Type: text/html; charset="utf-8"\r\n' +
                'Content-Disposition: inline\r\n';
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
                            fs_1.default.writeFile(this.TOKEN_PATH, JSON.stringify(token, null, 2), (err) => {
                                if (err)
                                    return reject(err);
                                console.log('Token stored to', this.TOKEN_PATH);
                                resolve(oAuth2Client);
                            });
                        });
                    });
                }
            });
        });
    }
    send(gmail, email, userId) {
        // Takes in already encoded base 64 email
        return new Promise((resolve, reject) => {
            gmail.users.messages.send({
                'userId': userId,
                'resource': {
                    'raw': email
                }
            }, (err, res) => {
                if (err)
                    reject(err.errors[0]);
                if (res.status === 200)
                    resolve(res.status);
            });
        });
    }
    setFrequency(freq) {
        console.log('Reset sending frequency', freq);
        this.sendFrequency = freq;
    }
    SingleDelivery(mail) {
        //  if(typeof mail==='json') throw 'Invalid Types'
        const headers = this.Head + 'Content-Length: ' + mail.body.length + '\r\n\r\n';
        let reply = '';
        if (mail.replyTo !== undefined)
            reply = 'Reply-To: ' + mail.replyTo + '\r\n';
        const from = 'From: ' + GmailConfig.username + ' <' + mail.from + '>\r\n';
        if (mail.to === 'me')
            mail.to = GmailConfig.userId;
        const to = 'To: ' + mail.to + '\r\n';
        const subject = 'Subject: ' + mail.subject + '\r\n';
        return new Promise((resolve, reject) => {
            var mail64 = Buffer.from(from + to + reply + subject + headers + mail.body + '\r\n--' + this.MultipartSepartor + '--\r\n')
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            this.authorize().then((auth) => {
                console.log('Sending email to ' + mail.to);
                this.send(googleapis_1.google.gmail({ version: 'v1', auth }), mail64, GmailConfig.userId).then((res) => {
                    if (res === 200)
                        resolve(res);
                    else
                        reject();
                }).catch((err) => {
                    console.error(err);
                });
            });
        });
    }
    SingleDataDelivery(mail, content, data) {
        var splits = content.split('$');
        var peices = [], identifiers = [];
        var mail64 = null;
        return new Promise((resolve, reject) => {
            // ----- EMAIL CONTENT FORMATTING ----- 
            // Put Address identifiers and surrounding text in arrays
            for (let p = 0; p <= splits.length; p += 2)
                peices.push(splits[p]);
            for (let a = 1; a < splits.length; a += 2)
                identifiers.push(splits[a]);
            let current_email = '';
            // Insert data into email block copy
            for (var j = 0; j < peices.length; j++) {
                let _data = '';
                for (var k = 0; k < data.length; k++)
                    if (identifiers[j] === data[k].id) {
                        _data = data[k].data;
                        break;
                    }
                let next = peices[j] + _data;
                current_email = current_email + next;
            }
            const headers = this.Head + 'Content-Length: ' + current_email.length + '\r\n\r\n';
            if (mail.to === 'me')
                mail.to = GmailConfig.userId;
            const to = 'To: ' + mail.to + '\r\n';
            const from = 'From: ' + GmailConfig.username + ' <' + mail.from + '>\r\n';
            let dyn_sub = '';
            try {
                dyn_sub = current_email.split('<title>')[1].split('</title>')[0];
            }
            catch (e) {
                dyn_sub = mail.subject;
            }
            const subject = 'Subject: ' + dyn_sub + '\r\n';
            mail64 = Buffer.from(from + to + subject + headers + current_email + '\r\n--' + this.MultipartSepartor + '--\r\n').toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            this.authorize().then((auth) => {
                console.log('Sending email to ' + mail.to);
                this.send(googleapis_1.google.gmail({ version: 'v1', auth }), mail64, GmailConfig.userId).then((res) => {
                    if (res === 200)
                        resolve(res);
                    else
                        reject();
                }).catch((err) => {
                    console.error(err);
                });
            });
        });
    }
    DatasetDelivery(mail, content, database) {
        // if(typeof content!=='string' || typeof database!=='string' || typeof mail==='json') 
        //     throw('Invalid Types :: ' + typeof content + ' ' + typeof database + ' ' + typeof mail);
        let data = [], addressList = [];
        let raw = database.split('\r\n');
        let heads = raw[0].split(',');
        return new Promise((resolve, reject) => {
            // ----- EMAIL ADDRESS EXTRACTION -----
            for (let row = 1; row < raw.length; row++) {
                let row_entry = [];
                for (let col = 0; col < heads.length; col++)
                    if (heads[col] === 'EMAIL')
                        addressList.push(raw[row].split(',')[col]);
                    else {
                        row_entry.push({
                            id: heads[col],
                            data: raw[row].split(',')[col]
                        });
                    }
                data.push(row_entry);
            }
            // ----- EMAIL CONTENT FORMATTING ----- 
            var splits = content.split('$');
            var emails = [], peices = [], identifiers = [];
            // Put Address identifiers and surrounding text in arrays
            for (let p = 0; p <= splits.length; p += 2)
                peices.push(splits[p]);
            for (let a = 1; a < splits.length; a += 2)
                identifiers.push(splits[a]);
            // Itrate over the entire data
            for (let i = 0; i < data.length; i++) {
                let current_email = '';
                // Insert data into email block copy
                for (var j = 0; j < peices.length; j++) {
                    let _data = '';
                    for (var k = 0; k < data[i].length; k++)
                        if (identifiers[j] === data[i][k].id) {
                            _data = data[i][k].data;
                            break;
                        }
                    const next = peices[j] + _data;
                    current_email = current_email + next;
                }
                const headers = this.Head + 'Content-Length: ' + current_email.length + '\r\n\r\n';
                if (addressList[i] === 'me')
                    addressList[i] = GmailConfig.userId;
                const to = 'To: ' + addressList[i] + '\r\n';
                const from = 'From: ' + GmailConfig.username + ' <' + mail.from + '>\r\n';
                let dyn_sub = '';
                try {
                    dyn_sub = current_email.split('<title>')[1].split('</title>')[0];
                }
                catch (e) {
                    dyn_sub = mail.subject;
                }
                const subject = 'Subject: ' + dyn_sub + '\r\n';
                emails.push(Buffer.from(from + to + subject + headers + current_email + '\r\n--' + this.MultipartSepartor + '--\r\n').toString('base64')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, ''));
            }
            // SENDING BASE 64 EMAILS
            this.authorize().then((auth) => {
                var INDEX = 0, time;
                console.log('Processing', addressList.length, 'emails');
                function deploy() {
                    time = +new Date();
                    setTimeout(function () {
                        if (addressList[INDEX] !== undefined) {
                            console.log('Sending email to ' + addressList[INDEX]);
                            this.send(googleapis_1.google.gmail({ version: 'v1', auth }), emails[INDEX], GmailConfig.userId)
                                .then((res) => {
                                if (res === 200) {
                                    INDEX++;
                                    if (INDEX < emails.length)
                                        deploy();
                                    else
                                        resolve();
                                }
                            })
                                .catch((err) => {
                                console.error(err);
                            });
                        }
                        else {
                            console.log('Invalid Data Row ::', INDEX);
                        }
                    }, this.sendFrequency - ((+new Date()) - time));
                }
                deploy();
            });
        });
    }
}
exports.default = Gmailer;
//# sourceMappingURL=Gmailer.js.map