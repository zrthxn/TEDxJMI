"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
require('dotenv').config();
const ENCRYPTION_KEY = process.env.CLIENT_KEY;
const IV_LENGTH = 16;
const ALGO = 'aes-256-cbc';
/**
 * Encrypts the given string with the client key stored in the
 * environment variables
 * @param text Text to be encrypted
 * @param encoding Output encoding `optional`
 */
function encrypt(text, encoding) {
    if (encoding === undefined)
        encoding = 'hex';
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString(encoding) + ':' + encrypted.toString(encoding);
}
exports.encrypt = encrypt;
/**
 * Decrypts the given string which was encrypted by `encrypt`
 * @param text Text to be decrypted
 * @param encoding Input encoding
 */
function decrypt(text, encoding) {
    if (encoding === undefined)
        encoding = 'hex';
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), encoding);
    const encryptedText = Buffer.from(textParts.join(':'), encoding);
    const decipher = crypto_1.default.createDecipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
//# sourceMappingURL=Encryption.js.map