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
exports.SignupRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../../models/user");
const auth_validator_1 = require("../../validators/auth/auth-validator");
const validate_request_1 = require("../../middlewares/validate-request");
const profile_1 = require("../../models/profile");
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Router = express_1.default.Router();
exports.SignupRouter = Router;
Router.post('/api/auth/signup', auth_validator_1.AuthValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, name, email, age, phone, bio, photo, theme, interests, password } = req.body;
        const transporter = nodemailer_1.default.createTransport(sendGridTransport({
            auth: {
                api_key: process.env.NODEMAILER_API_KEY,
            }
        }));
        const existingUser1 = yield user_1.User.findOne({ email });
        if (existingUser1) {
            throw new Error("Email address already exists!");
        }
        const existingUser2 = yield user_1.User.findOne({ userName });
        if (existingUser2) {
            throw new Error("Username already exists!");
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, 12);
        const profile = profile_1.Profile.build({
            name, age, bio, photo, theme, phone, interests,
        });
        yield profile.save();
        const user = user_1.User.build({
            userName, email, password: passwordHash, profile: profile.id, online: false,
        });
        yield user.save();
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ email, id: user.id }, secretKey, {
            expiresIn: '24h',
        });
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;
        yield transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to Bluecats!',
            html: '<h1>You have successfully signed up on Bluecats.</h1>',
        });
        res.status(201).send({
            message: 'User signed up successfully',
            token,
            id: user.id,
            expiryDate,
        });
    }
    catch (err) {
        next(err);
    }
}));
