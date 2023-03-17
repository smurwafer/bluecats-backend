"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('image')
        .not()
        .isEmpty()
        .withMessage('Image should not be empty'),
    (0, express_validator_1.body)('sketch')
        .not()
        .isEmpty()
        .withMessage('Sketch should not be empty'),
    (0, express_validator_1.body)('cost')
        .isNumeric()
        .withMessage('Cost should be numeric'),
    (0, express_validator_1.body)('user')
        .not()
        .isEmpty()
        .withMessage('User should not be empty'),
    (0, express_validator_1.body)('address')
        .not()
        .isEmpty()
        .withMessage('Address should not be empty'),
    (0, express_validator_1.body)('needVideo')
        .isBoolean()
        .withMessage('NeedVideo should be boolean'),
    (0, express_validator_1.body)('private')
        .isBoolean()
        .withMessage('Private should be boolean'),
];
exports.OrderValidator = validator;
