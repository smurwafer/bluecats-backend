"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('email')
        .if((0, express_validator_1.body)('phone').isEmpty())
        .notEmpty()
        .withMessage('Email or Phone is required'),
    (0, express_validator_1.body)('phone')
        .if((0, express_validator_1.body)('email').isEmpty())
        .notEmpty()
        .withMessage('Email or Phone is required'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required'),
    (0, express_validator_1.body)('isAdmin')
        .notEmpty()
        .withMessage('isAdmin is required')
];
exports.AuthValidator = validator;
