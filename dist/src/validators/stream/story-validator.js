"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('Title should not be empty'),
    (0, express_validator_1.body)('type')
        .not()
        .isEmpty()
        .withMessage('Type should not be empty'),
    (0, express_validator_1.body)('gallery')
        .isLength({ min: 1 })
        .withMessage('Atleast 1 gallery item must be added'),
    (0, express_validator_1.body)('channel')
        .not()
        .isEmpty()
        .withMessage('Channel should not be empty'),
];
exports.StreamValidator = validator;
