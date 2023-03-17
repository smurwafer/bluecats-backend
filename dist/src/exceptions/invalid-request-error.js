"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRequestError = void 0;
const custom_error_1 = require("./custom-error");
class InvalidRequestError extends custom_error_1.CustomError {
    constructor(message, validationErrors) {
        super(message);
        this.message = message;
        this.validationErrors = validationErrors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, InvalidRequestError.prototype);
    }
    serializeErrors() {
        return this.validationErrors ? this.validationErrors.map((err) => ({ message: err.msg, field: err.param })) : [{ message: this.message }];
    }
}
exports.InvalidRequestError = InvalidRequestError;
