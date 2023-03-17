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
const order_state_1 = require("../../../src/utility/order-state");
const setup_1 = require("../../setup");
describe('POST /api/order', () => {
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/order')
            .send({
            image: '123456789012345678901234',
            sketch: '123456789012345678901235',
            caption: 'Order caption',
            cost: 100,
            user: '123456789012345678901236',
            address: '123456789012345678901237',
            needVideo: false,
            private: false,
        })
            .expect(401);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns 400 if invalid request body is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/order')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({})
            .expect(400);
        expect(response.body.errors).toBeDefined();
    }));
    it('returns 201 if order is created successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/order')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            image: '123456789012345678901234',
            sketch: '123456789012345678901235',
            caption: 'Order caption',
            cost: 100,
            user: '123456789012345678901236',
            address: '123456789012345678901237',
            needVideo: false,
            private: false,
        })
            .expect(201);
        expect(response.body.order).toBeDefined();
        expect(response.body.order.state).toEqual(order_state_1.OrderState.BOOKED);
    }));
});
