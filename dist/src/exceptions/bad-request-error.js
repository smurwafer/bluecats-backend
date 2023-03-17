"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom-error");
class BadRequestError extends custom_error_1.CustomError {
    constructor(message, field) {
        super(message);
        this.message = message;
        this.field = field;
        this.statusCode = 400;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, field: this.field }];
    }
}
exports.BadRequestError = BadRequestError;
