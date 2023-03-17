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
exports.OrderShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const not_found_error_1 = require("../../exceptions/not-found-error");
const require_auth_1 = require("../../middlewares/require-auth");
const order_1 = require("../../models/order");
const Router = express_1.default.Router();
exports.OrderShowRouter = Router;
Router.get('/api/order/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield order_1.Order.findById(id);
        if (!order)
            throw new not_found_error_1.NotFoundError('Order Not Found!');
        res.status(200).send({
            message: 'order retrieved successfully',
            order,
        });
    }
    catch (err) {
        next(err);
    }
}));
