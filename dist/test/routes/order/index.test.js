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
describe('GET /api/order', () => {
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/order')
            .send()
            .expect(401);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns orders belonging to the authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: userId, token: userToken } = (0, setup_1.sign)();
        const { id: adminId, token: adminToken } = (0, setup_1.sign)('admin@test.com', '3214567890', true);
        const adminOrder = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield adminOrder.save();
        const userOrder = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: userId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield userOrder.save();
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/order')
            .set('Authorization', `Bearer ${userToken}`)
            .send()
            .expect(200);
        expect(response.body.orders).toHaveLength(1);
        expect(response.body.orders[0].id).toEqual(userOrder.id);
    }));
});
describe('GET /api/all-order', () => {
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/all-order')
            .send()
            .expect(401);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns 403 if user is not an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/all-order')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send()
            .expect(403);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns all orders if user is an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: userId, token: userToken } = (0, setup_1.sign)();
        const { id: adminId, token: adminToken } = (0, setup_1.sign)('admin@test.com', '3214567890', true);
        const adminOrder = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield adminOrder.save();
        const userOrder = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: userId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield userOrder.save();
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/all-order')
            .set('Authorization', `Bearer ${adminToken}`)
            .send()
            .expect(200);
        expect(response.body.orders).toHaveLength(2);
    }));
    it('returns orders belonging to the specified user', () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: adminId, token: adminToken } = (0, setup_1.sign)('admin@test.com', '3214567890', true);
        const adminOrder = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: order_state_1.OrderState.BOOKED,
        });
        yield adminOrder.save();
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/all-order?userId=${adminOrder.user}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send()
            .expect(200);
        expect(response.body.orders).toHaveLength(1);
        expect(response.body.orders[0].id).toEqual(adminOrder.id);
    }));
});
