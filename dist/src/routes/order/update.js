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
exports.OrderUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const not_found_error_1 = require("../../exceptions/not-found-error");
const require_admin_1 = require("../../middlewares/require-admin");
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const order_1 = require("../../models/order");
const order_state_1 = require("../../utility/order-state");
const order_validator_1 = require("../../validators/order/order-validator");
const Router = express_1.default.Router();
exports.OrderUpdateRouter = Router;
Router.put('/api/order/:id', require_auth_1.requireAuth, order_validator_1.OrderValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield order_1.Order.findById(id);
        if (!order)
            throw new not_found_error_1.NotFoundError('Order Not Found!');
        const { image, sketch, caption, cost, user, address, needVideo, private: pvt } = req.body;
        order.set({
            image, sketch, caption, cost, user, address, needVideo, private: pvt
        });
        yield order.save();
        res.status(204).send({
            message: 'order updated successfully',
            order,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.put('/api/change-order-state/:id', require_auth_1.requireAuth, require_admin_1.requireAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { move } = req.query;
        const order = yield order_1.Order.findById(id);
        if (!order)
            throw new not_found_error_1.NotFoundError('Order Not Found!');
        const currentState = order.state;
        let state;
        if (move == 'backward')
            state = (0, order_state_1.prevState)(currentState);
        else
            state = (0, order_state_1.nextState)(currentState);
        order.set({
            state
        });
        yield order.save();
        res.status(204).send({
            message: 'order updated successfully',
            order,
        });
    }
    catch (err) {
        next(err);
    }
}));
