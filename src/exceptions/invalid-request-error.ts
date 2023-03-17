import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';

export class InvalidRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string, public validationErrors?: ValidationError[]) {
        super(message);
        Object.setPrototypeOf(this, InvalidRequestError.prototype);
    }
    serializeErrors() {
        return this.validationErrors ? this.validationErrors.map((err) => ({ message: err.msg, field: err.param })) : [{ message: this.message }];
    }
}