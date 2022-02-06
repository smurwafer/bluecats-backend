"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('text')
        .not()
        .isEmpty()
        .withMessage('Text should not be empty'),
];
exports.CommentValidator = validator;
