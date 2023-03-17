"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('emailOrPhone')
        .notEmpty()
        .withMessage('Email or Phone is required'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required'),
];
exports.LoginValidator = validator;
