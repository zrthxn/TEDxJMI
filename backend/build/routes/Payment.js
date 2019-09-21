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
const Encryption_1 = require("../utils/Encryption");
const Gmailer_1 = __importDefault(require("../utils/Gmailer"));
exports.PaymentsRouter = express_1.default.Router();
require('dotenv').config();
const ServerConfig = require('../../assets/config.json');
const { basePrice, internalDiscountAmount, txnFee, taxRate } = ServerConfig.tickets;
exports.PaymentsRouter.use((req, res, next) => {
    if (process.env.REGISTERATION_OPEN !== 'YES')
        return res.status(200).send('Registrations Closed');
    next();
});
exports.PaymentsRouter.post('/create', (req, res) => {
    const { user } = req.body;
    const transaction = {
        baseAmount: undefined,
        discountPercentApplied: undefined,
        taxPercent: undefined,
        amountPaid: undefined,
        status: 'PENDING'
    };
    Database_1.default.collection('Tickets').where('email', '==', user.email)
        .get()
        .then((searchResults) => __awaiter(this, void 0, void 0, function* () {
        if (searchResults.docs.length !== 0)
            throw new Error("User Already Exists");
        transaction.baseAmount = basePrice;
        if (user.isInternalStudent && user.studentIdNumber !== undefined && user.studentIdNumber !== '')
            transaction.baseAmount = internalDiscountAmount;
        const query = yield Database_1.default.collection('Coupons').where('couponCode', '==', user.couponCode).limit(1).get();
        if (query.docs !== undefined && query.docs.length > 0) {
            const coupon = query.docs[0].data();
            if (coupon !== undefined && coupon !== null) {
                if (coupon.maxUses !== 0) {
                    transaction.discountPercentApplied = coupon.discount;
                    Database_1.default.collection('Coupons').doc(query.docs[0].id).update({ maxUses: (coupon.maxUses - 1) });
                }
                else
                    transaction.discountPercentApplied = 0;
            }
            else
                transaction.discountPercentApplied = 0;
        }
        else
            transaction.discountPercentApplied = 0;
        transaction.taxPercent = taxRate * 100;
        // CRUCIAL --------------------------------
        transaction.amountPaid = Math.ceil((transaction.baseAmount * (1 + (taxRate * (1 + txnFee)))) * (1 - transaction.discountPercentApplied / 100));
        // ========================================
        Database_1.default.collection('Mailing List').add({ name: user.name, email: user.email });
        Database_1.default.collection('Transactions').add(transaction).then((doc) => {
            transaction['txnid'] = doc.id;
            res.send({
                transaction,
                encoding: 'hex',
                apiKey: Encryption_1.encrypt(process.env.PAYU_KEY),
                salt: Encryption_1.encrypt(process.env.PAYU_SALT),
                checksum: crypto_1.default.createHash('sha512').update(JSON.stringify(transaction)).digest("base64")
            });
        });
    })).catch((err) => {
        console.error(err);
        res.status(403).send(err);
    });
});
exports.PaymentsRouter.post('/verify', (req, res) => {
    const Gmail = new Gmailer_1.default();
    const data = req.body;
    const ref = Database_1.default.collection('Transactions').doc(data.merchantTransactionId);
    Database_1.default.runTransaction(t => {
        return t.get(ref).then(doc => {
            var TEMPLATE_PATH;
            if (data.status === 'Success') {
                t.update(ref, { status: 'VERIFIED' });
                TEMPLATE_PATH = path_1.default.join(__dirname, '..', '..', 'assets', 'templates', 'paymentconfirm.html');
            }
            else {
                t.update(ref, { status: 'FAILED' });
                TEMPLATE_PATH = path_1.default.join(__dirname, '..', '..', 'assets', 'templates', 'paymentfail.html');
            }
            fs_1.default.readFile(TEMPLATE_PATH, (err, content) => {
                if (err)
                    return console.error(err);
                Gmail.SingleDataDelivery({
                    to: doc.data().email,
                    from: 'noreply@tedxjmi.org'
                }, content.toString(), [
                    { id: 'txnid', data: doc.id }
                ]);
            });
        });
    });
    res.sendStatus(200);
});
//# sourceMappingURL=Payment.js.map