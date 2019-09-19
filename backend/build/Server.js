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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bodyParser = __importStar(require("body-parser"));
const crypto_1 = __importDefault(require("crypto"));
const Gmailer_1 = __importDefault(require("./utils/Gmailer"));
const GSheets_1 = __importDefault(require("./utils/GSheets"));
require('dotenv').config();
/**
 * @authors
 * Alisamar Husain | @zrthxn
 * Azim Javed | @AzimJaved
 *
 * @copyright 2019
 * Copyright TEDxJMI
 *
 * @license MIT
 * This software is provided as-is with no
 * warranties or guatantees.
 */
const server = express_1.default();
const ServerConfig = require('../assets/config.json');
const { PORT } = ServerConfig || 4000;
// server.use(cookieParser())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.listen(PORT, (err) => __awaiter(this, void 0, void 0, function* () {
    if (err)
        return console.error(err);
    console.log(`Starting on ${PORT}`);
    console.log('Recalculating security values');
    const GENERATOR = crypto_1.default.randomBytes(64).toString('base64');
    const SECRET = crypto_1.default.randomBytes(256).toString('base64');
    ServerConfig.security = { GENERATOR, SECRET };
    fs_1.default.readFile(path_1.default.join(__dirname, '..', 'assets', 'config.json'), (ser, data) => {
        if (ser)
            return console.error(ser);
        data = JSON.parse(data.toString());
        data['security'] = { GENERATOR, SECRET };
        fs_1.default.writeFile(path_1.default.join(__dirname, '..', 'assets', 'config.json'), JSON.stringify(data, null, 2), () => { });
    });
    console.log('Listening');
    const Gmail = new Gmailer_1.default();
    const gmail = yield Gmail.TestGmailer();
    console.log('Done', gmail.success);
    const Sheets = new GSheets_1.default();
    const sheets = yield Sheets.TestGSheets();
    console.log('Done', sheets.success);
}));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ServerConfig.policy.ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Headers', ServerConfig.policy.ALLOW_HEADERS);
    res.header('Access-Control-Allow-Methods', ServerConfig.policy.ALLOW_METHODS);
    next();
});
// --------------------------------------------------------
const Register_1 = require("./routes/Register");
const Payment_1 = require("./routes/Payment");
server.post('/_authenticate', (req, res) => {
    const { clientId, apiKey } = req.body;
    const { GENERATOR, SECRET } = ServerConfig.security;
    if (apiKey !== undefined)
        if (apiKey !== crypto_1.default.createHmac('sha256', clientId).update(process.env.CLIENT_KEY).digest('base64'))
            return res.status(403).send('ERR_INVALID_APIKEY');
    const random = crypto_1.default.randomBytes(32).toString('base64');
    const authToken = crypto_1.default.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64');
    res.send({
        key: random,
        token: authToken
    });
});
server.use((req, res, next) => {
    /**
     * @description Security Middleware
     */
    const { GENERATOR, SECRET } = ServerConfig.security;
    let random = req.headers['x-request-validation'];
    const token = req.headers['authorization'];
    if (random === undefined)
        return res.send('Request Authentication Failed');
    random = random.toString();
    const hash = crypto_1.default.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64');
    if (hash === token)
        next();
    else
        res.send('Request Authentication Failed');
});
// Website and API Router
server.use('/_payments', Payment_1.PaymentsRouter);
server.use('/_register', Register_1.RegisterRouter);
server.post('/_contact', (req, res) => {
    // let data = req.body
    // mailer.SingleDelivery({
    //   from: ServerConfig.Gmail.username,
    //   to: ServerConfig.Gmail.username,
    //   subject: 'Contact Form | ' + snapshot.docs[index].data().name + ' | ' + data.name,
    //   replyTo: data.email,
    //   body: `
    //         <b>---------------- Contact Form Message ----------------</b> <br><br>
    //         Name: ${data.name} <br> Email: ${data.email}<br><br>
    //         Message: ${data.message}<br><br>
    //         <b>------------------- End of Message -------------------</b> <br><br>
    //       `
    // }).then(() => {
    res.sendStatus(200);
    // })
});
server.use((req, res) => {
    // End any caught requests if no matching paths are found
    res.end('Request Forcefully Closed');
});
//# sourceMappingURL=Server.js.map