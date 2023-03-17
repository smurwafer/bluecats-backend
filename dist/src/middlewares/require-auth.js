"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const unauthorized_error_1 = require("../exceptions/unauthorized-error");
const requireAuth = (req, res, next) => {
    try {
        if (!req.currentUser)
            throw new unauthorized_error_1.UnauthorizedError('Unauthorized user!');
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.requireAuth = requireAuth;
