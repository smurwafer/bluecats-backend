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
const user_1 = require("../../models/user");
const validate_request_1 = require("../../middlewares/validate-request");
const login_validator_1 = require("../../validators/auth/login-validator");
const not_found_error_1 = require("../../exceptions/not-found-error");
const bad_request_error_1 = require("../../exceptions/bad-request-error");
const send_mail_1 = require("../../utility/send-mail");
const Router = express_1.default.Router();
exports.LoginRouter = Router;
Router.post('/api/auth/login', login_validator_1.LoginValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrPhone, password } = req.body;
        const existingUser = yield user_1.User.findOne({
            $or: [{
                    email: emailOrPhone,
                }, {
                    phone: emailOrPhone,
                }]
        });
        if (!existingUser)
            throw new not_found_error_1.NotFoundError("No such user exists!");
        const isValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isValid)
            throw new bad_request_error_1.BadRequestError("Password not valid!");
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({
            email: existingUser.email,
            phone: existingUser.phone,
            isAdmin: existingUser.isAdmin,
            id: existingUser.id
        }, secretKey, {
            expiresIn: '24h',
        });
        const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;
        yield (0, send_mail_1.sendMail)(existingUser);
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
