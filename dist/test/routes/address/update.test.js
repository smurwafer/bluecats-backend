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
const address_1 = require("../../../src/models/address");
const setup_1 = require("../../setup");
describe('PUT /api/address/:id', () => {
    let address;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new address to update in the test
        address = address_1.Address.build({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        });
        yield address.save();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Remove the address created in the test
        yield address.remove();
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(401);
    }));
    it('returns 404 if address is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/123456789012345678901234`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(404);
    }));
    it('returns 400 if invalid name is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: '',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(400);
    }));
    it('returns 400 if invalid phone is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(400);
    }));
    it('returns 400 if invalid state is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: '',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(400);
    }));
    it('returns 400 if invalid country is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: '',
            pincode: '654321'
        })
            .expect(400);
    }));
    it('returns 400 if invalid pincode is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: ''
        })
            .expect(400);
    }));
    it('returns 204 if address update is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'Updated Name',
            phone: '1234567890',
            house: 'Updated House No. 123',
            street: 'Updated Main Street',
            area: 'Updated Area 51',
            district: 'Updated District 9',
            state: 'Updated State of Mind',
            country: 'Updated Country of God',
            pincode: '654321'
        })
            .expect(204);
    }));
});
