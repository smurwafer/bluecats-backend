"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const forbidden_request_error_1 = require("../exceptions/forbidden-request-error");
const requireAdmin = (req, res, next) => {
    try {
        if (!req.currentUser || !req.currentUser.isAdmin)
            throw new forbidden_request_error_1.ForbiddenRequestError('Forbidden request, only admin allowed!');
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.requireAdmin = requireAdmin;
