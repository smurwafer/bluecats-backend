"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendGridTransport = require('nodemailer-sendgrid-transport');
const SENDER_MAIL = 'manaskumar2808@gmail.com';
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport(sendGridTransport({
        auth: {
            api_key: process.env.NODEMAILER_API_KEY,
        }
    }));
    const mailResponse = yield transporter.sendMail({
        to: user.email,
        from: SENDER_MAIL,
        subject: 'Welcome to Artworks!',
        html: `<h1>Good to see you ${user.name}.</h1>`,
    });
    return mailResponse;
});
exports.sendMail = sendMail;
