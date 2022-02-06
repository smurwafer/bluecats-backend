"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new Error("Not Authorized!");
    }
    next();
};
exports.requireAuth = requireAuth;
