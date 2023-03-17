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
describe('POST /api/address', () => {
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .send({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        })
            .expect(401);
    }));
    it('returns 400 if invalid name is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: '',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        })
            .expect(400);
    }));
    it('returns 400 if invalid phone is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'John Doe',
            phone: '',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        })
            .expect(400);
    }));
    it('returns 400 if invalid state is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: '',
            country: 'Country of God',
            pincode: '123456'
        })
            .expect(400);
    }));
    it('returns 400 if invalid country is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: '',
            pincode: '123456'
        })
            .expect(400);
    }));
    it('returns 400 if invalid pincode is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: ''
        })
            .expect(400);
    }));
    it('returns 201 and creates an address with valid inputs', () => __awaiter(void 0, void 0, void 0, function* () {
        let addresses = yield address_1.Address.find({});
        expect(addresses.length).toEqual(0);
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        })
            .expect(201);
        addresses = yield address_1.Address.find({});
        expect(addresses.length).toEqual(1);
    }));
});
