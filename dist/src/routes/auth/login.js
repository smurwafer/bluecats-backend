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
exports.LoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../../models/user");
const profile_1 = require("../../models/profile");
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Router = express_1.default.Router();
exports.LoginRouter = Router;
Router.post('/api/auth/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, password } = req.body;
        const transporter = nodemailer_1.default.createTransport(sendGridTransport({
            auth: {
                api_key: process.env.NODEMAILER_API_KEY,
            }
        }));
        const existingUser = yield user_1.User.findOne({
            $or: [{
                    email,
                }, {
                    userName,
                }]
        });
        if (!existingUser) {
            throw new Error("No such user exists!");
        }
        const existingProfile = yield profile_1.Profile.findById(existingUser.profile);
        if (!existingProfile) {
            throw new Error("No such profile exists!");
        }
        const isValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isValid) {
            throw new Error("Password not valid!");
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ email, id: existingUser.id }, secretKey, {
            expiresIn: '24h',
        });
        const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;
        transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to Bluecats!',
            html: `<h1>Good to see you ${existingProfile.name}.</h1>`,
        });
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            id: existingUser.id,
            expiryDate,
        });
    }
    catch (err) {
        next(err);
    }
}));
