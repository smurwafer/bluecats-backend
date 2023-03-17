"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_admin_1 = require("../../middlewares/require-admin");
const require_auth_1 = require("../../middlewares/require-auth");
const order_1 = require("../../models/order");
const Router = express_1.default.Router();
exports.OrderIndexRouter = Router;
Router.get('/api/order', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orders = yield order_1.Order.find({ user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id });
        res.status(200).send({
            message: 'orders retrieved successfully',
            orders,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.get('/api/all-order', require_auth_1.requireAuth, require_admin_1.requireAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        let orders;
        if (userId)
            orders = yield order_1.Order.find({ user: userId });
        else
            orders = yield order_1.Order.find();
        res.status(200).send({
            message: 'all orders retrieved successfully',
            orders,
        });
    }
    catch (err) {
        next(err);
    }
}));
