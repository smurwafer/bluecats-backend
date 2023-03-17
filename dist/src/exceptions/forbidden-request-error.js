"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenRequestError = void 0;
const custom_error_1 = require("./custom-error");
class ForbiddenRequestError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 403;
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, ForbiddenRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.ForbiddenRequestError = ForbiddenRequestError;
