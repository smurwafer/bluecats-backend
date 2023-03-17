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
const user_1 = require("../../models/user");
const auth_validator_1 = require("../../validators/auth/auth-validator");
const validate_request_1 = require("../../middlewares/validate-request");
const send_mail_1 = require("../../utility/send-mail");
const invalid_request_error_1 = require("../../exceptions/invalid-request-error");
const Router = express_1.default.Router();
exports.SignupRouter = Router;
Router.post('/api/auth/signup', auth_validator_1.AuthValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, name, password, addresses, image, isAdmin } = req.body;
        const existingUser = yield user_1.User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser)
            throw new invalid_request_error_1.InvalidRequestError('User already exists');
        const passwordHash = yield bcryptjs_1.default.hash(password, 12);
        const user = new user_1.User({
            email, phone, name, password: passwordHash, addresses, image, isAdmin
        });
        yield user.save();
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ email, phone, id: user.id, isAdmin }, secretKey, {
            expiresIn: '24h',
        });
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;
        yield (0, send_mail_1.sendMail)(user);
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
