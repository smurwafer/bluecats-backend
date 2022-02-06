"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('Title should not be empty'),
];
exports.StoryValidator = validator;
