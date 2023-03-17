"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const invalid_request_error_1 = require("../exceptions/invalid-request-error");
const validateRequest = (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            throw new invalid_request_error_1.InvalidRequestError('Invalid request parameters', errors.array());
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateRequest = validateRequest;
