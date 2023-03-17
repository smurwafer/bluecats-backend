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
describe('GET /api/address/:id', () => {
    let address;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new address for testing
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
            .get(`/api/address/${address.id}`)
            .expect(401);
    }));
    it('returns 404 if address is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/api/address/123456789012345678901234')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .expect(404);
    }));
    it('returns 200 with the address object if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .expect(200);
        expect(response.body.address.name).toEqual('John Doe');
        expect(response.body.address.phone).toEqual('1234567890');
        expect(response.body.address.house).toEqual('House No. 123');
        expect(response.body.address.street).toEqual('Main Street');
        expect(response.body.address.area).toEqual('Area 51');
        expect(response.body.address.district).toEqual('District 9');
        expect(response.body.address.state).toEqual('State of Mind');
        expect(response.body.address.country).toEqual('Country of God');
        expect(response.body.address.pincode).toEqual('123456');
    }));
});
