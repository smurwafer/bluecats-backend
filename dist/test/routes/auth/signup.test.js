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
describe('POST /api/auth/signup', () => {
    it('returns 201 and token on successful signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: 'testuser@test.com',
            phone: '1234567890',
            name: 'Test User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        })
            .expect(201);
        expect(response.body.token).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.expiryDate).toBeDefined();
    }));
    it('returns 400 when email is already registered', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user with the same email before running this test
        const existingUser = user_1.User.build({
            email: 'testuser@test.com',
            phone: '0987654321',
            name: 'Existing User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        });
        yield existingUser.save();
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: 'testuser@test.com',
            phone: '1234567890',
            name: 'Test User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        })
            .expect(400);
        yield existingUser.remove();
    }));
    it('returns 400 when phone is already registered', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user with the same phone before running this test
        const existingUser = user_1.User.build({
            email: 'existinguser@test.com',
            phone: '1234567890',
            name: 'Existing User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        });
        yield existingUser.save();
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: 'testuser@test.com',
            phone: '1234567890',
            name: 'Test User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        })
            .expect(400);
        yield existingUser.remove();
    }));
});
