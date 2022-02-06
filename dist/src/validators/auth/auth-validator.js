"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('userName')
        .isLength({
        min: 2,
        max: 20,
    })
        .withMessage('Username length must be between 2 and 20'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];
exports.AuthValidator = validator;
