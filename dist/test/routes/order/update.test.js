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
describe('PUT /api/order', () => {
    let orderId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const order = order_1.Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 100,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: true,
            state: order_state_1.OrderState.BOOKED,
        });
        yield order.save();
        orderId = order.id;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Delete the order created for testing
        yield order_1.Order.deleteMany({});
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/order/${orderId}`)
            .send({
            image: 'updated image',
            sketch: 'updated sketch',
            caption: 'updated caption',
            cost: 200,
            user: 'updated user',
            address: 'updated address',
            needVideo: false,
            private: false,
        })
            .expect(401);
    }));
    it('returns 404 if order is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/order/605fe2e0251ab14f98e90392`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            image: 'updated image',
            sketch: 'updated sketch',
            caption: 'updated caption',
            cost: 200,
            user: 'updated user',
            address: 'updated address',
            needVideo: false,
            private: false,
        })
            .expect(404);
    }));
    it('updates the order if input is valid and user is authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/order/${orderId}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            image: 'updated image',
            sketch: 'updated sketch',
            caption: 'updated caption',
            cost: 200,
            user: 'updated user',
            address: 'updated address',
            needVideo: false,
            private: false,
        })
            .expect(204);
        const updatedOrderResponse = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/order/${orderId}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .expect(200);
        expect(updatedOrderResponse.body.order.image).toEqual('updated image');
        expect(updatedOrderResponse.body.order.sketch).toEqual('updated sketch');
        expect(updatedOrderResponse.body.order.caption).toEqual('updated caption');
        expect(updatedOrderResponse.body.order.cost).toEqual(200);
        expect(updatedOrderResponse.body.order.user).toEqual('updated user');
        expect(updatedOrderResponse.body.order.address).toEqual('updated address');
        expect(updatedOrderResponse.body.order.private).toEqual(false);
    }));
    it('returns a 404 error if the order does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '605fe2e0251ab14f98e90392';
        const move = 'forward';
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/change-order-state/${id}?move=${move}`)
            .set('Authorization', `Bearer ${setup_1.adminToken}`)
            .send({})
            .expect(404);
    }));
    it('returns a 401 error if the user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const move = 'forward';
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .send({})
            .expect(401);
    }));
    it('returns a 403 error if the user is not admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const move = 'forward';
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({})
            .expect(403);
    }));
    it('updates the order state to WORKING if currentState is BOOKED and move is forward', () => __awaiter(void 0, void 0, void 0, function* () {
        const move = 'forward';
        const res = yield (0, supertest_1.default)(app_1.app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .set('Authorization', `Bearer ${setup_1.adminToken}`)
            .send({})
            .expect(204);
        expect(res.body).toEqual({});
        const updatedOrder = yield order_1.Order.findById(orderId);
        expect(updatedOrder).toBeDefined();
        expect(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.state).toEqual(order_state_1.OrderState.WORKING);
    }));
});
