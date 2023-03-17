"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const currentUser = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader)
            return next();
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY;
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decodedToken)
            return next();
        req.currentUser = decodedToken;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.currentUser = currentUser;
