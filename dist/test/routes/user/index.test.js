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
const user_1 = require("../../../src/models/user");
describe('GET /api/user', () => {
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: 'testuser@test.com',
            phone: '1234567890',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'Test User',
            isAdmin: false,
        }).expect(201);
        expect(response.body.token).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.expiryDate).toBeDefined();
        token = response.body.token;
    }), 20000);
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/api/user')
            .expect(401);
    }));
    it('returns 200 and all users if user is authenticated and is an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: 'adminuser@test.com',
            phone: '0123456789',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'Admin User',
            isAdmin: true,
        }).expect(201);
        expect(response.body.token).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.expiryDate).toBeDefined();
        const adminToken = response.body.token;
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/api/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);
        expect(res.body.users.length).toEqual(2);
    }));
    it('returns 200 and an empty array if user is authenticated and is not an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.users.length).toEqual(0);
    }));
});
