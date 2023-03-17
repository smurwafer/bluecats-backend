"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('Name should not be empty'),
    (0, express_validator_1.body)('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number should not be empty'),
    (0, express_validator_1.body)('state')
        .not()
        .isEmpty()
        .withMessage('State should not be empty'),
    (0, express_validator_1.body)('country')
        .not()
        .isEmpty()
        .withMessage('Country should not be empty'),
    (0, express_validator_1.body)('pincode')
        .not()
        .isEmpty()
        .withMessage('Pincode should not be empty'),
];
exports.AddressValidator = validator;
