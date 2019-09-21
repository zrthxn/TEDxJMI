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
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Database_1 = __importDefault(require("../utils/Database"));
const Gmailer_1 = __importDefault(require("../utils/Gmailer"));
require('dotenv').config();
exports.RegisterRouter = express_1.default.Router();
exports.RegisterRouter.use((req, res, next) => {
    if (process.env.REGISTERATION_OPEN !== 'YES')
        return res.status(200).send('Registrations Closed');
    next();
});
exports.RegisterRouter.post('/ticket', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user, txn, checksum } = req.body;
    const Gmail = new Gmailer_1.default();
    var ticketId = 'TEDXJMI';
    ticketId += Date.now().toString(36).toUpperCase();
    const hash = crypto_1.default.createHash('sha512').update(JSON.stringify(user)).update(JSON.stringify(txn)).digest('base64');
    if (hash !== checksum)
        return res.status(403).send({ status: 'AUTH_FAILED' });
    txn.status = 'SUCCESSFUL';
    yield Database_1.default.collection('Transactions').doc(txn.txnid).update({ status: 'SUCCESSFUL' });
    yield Database_1.default.collection('Tickets').doc(ticketId).set({ user, txn });
    fs_1.default.readFile(path_1.default.join(__dirname, '..', '..', 'assets', 'templates', 'confirmation.html'), (err, content) => {
        if (err)
            return console.error(err);
        Gmail.SingleDataDelivery({
            to: user.email,
            from: 'noreply@tedxjmi.org'
        }, content.toString(), [
            { id: 'name', data: user.name },
            { id: 'ticket', data: ticketId }
        ]);
    });
    res.send({ ticketId, status: 'AUTH_PASSED' });
}));
//# sourceMappingURL=Register.js.map