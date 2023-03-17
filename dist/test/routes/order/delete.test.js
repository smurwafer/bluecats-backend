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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const order_1 = require("../../../src/models/order");
const order_state_1 = require("../../../src/utility/order-state");
const setup_1 = require("../../setup");
describe('DELETE /api/order/:id', () => {
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield order.save();
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/api/order/${order.id}`)
            .send()
            .expect(401);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns 404 if order does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete('/api/order/605fe2e0251ab14f98e90392')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send()
            .expect(404);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns 204 and deletes the order', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield order.save();
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/api/order/${order.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send()
            .expect(204);
        expect(response.body).toEqual({});
        const deletedOrder = yield order_1.Order.findById(order.id);
        expect(deletedOrder).toBeNull();
    }));
});
