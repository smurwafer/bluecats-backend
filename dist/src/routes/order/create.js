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
exports.OrderCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const order_1 = require("../../models/order");
const order_state_1 = require("../../utility/order-state");
const order_validator_1 = require("../../validators/order/order-validator");
const Router = express_1.default.Router();
exports.OrderCreateRouter = Router;
Router.post('/api/order', require_auth_1.requireAuth, order_validator_1.OrderValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, sketch, caption, cost, user, address, needVideo, private: pvt } = req.body;
        const order = order_1.Order.build({
            image, sketch, caption, cost, user, address, needVideo, private: pvt, state: order_state_1.OrderState.BOOKED,
        });
        yield order.save();
        res.status(201).send({
            message: 'order created successfully',
            order,
        });
    }
    catch (err) {
        next(err);
    }
}));
