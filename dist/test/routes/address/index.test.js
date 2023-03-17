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
describe('GET /api/address', () => {
    let addresses;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create some sample addresses for testing
        const address1 = address_1.Address.build({
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
        const address2 = address_1.Address.build({
            name: 'Jane Doe',
            phone: '0987654321',
            house: 'House No. 456',
            street: 'Second Street',
            area: 'Area 52',
            district: 'District 10',
            state: 'State of Being',
            country: 'Country of Love',
            pincode: '654321'
        });
        addresses = [address1, address2];
        yield Promise.all(addresses.map((address) => address.save()));
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Remove the addresses created in the test
        yield Promise.all(addresses.map((address) => address.remove()));
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/api/address')
            .expect(401);
    }));
    it('returns 200 with a list of addresses if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/address')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .expect(200);
        expect(response.body.addresses.length).toEqual(2);
    }));
});
