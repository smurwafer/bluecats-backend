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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
describe('POST /api/auth/login', () => {
    let existingUser;
    let existingUserPassword = 'password123';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        let existingUserPasswordHash = yield bcryptjs_1.default.hash(existingUserPassword, 12);
        // Create a user for testing purposes
        existingUser = user_1.User.build({
            email: 'testuser@test.com',
            phone: '1234567890',
            password: existingUserPasswordHash,
            addresses: [],
            image: '',
            name: 'Test User',
            isAdmin: false,
        });
        yield existingUser.save();
    }));
    it('returns 200 and token on successful login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/login')
            .send({
            emailOrPhone: existingUser.email,
            password: existingUserPassword,
        })
            .expect(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.id).toEqual(existingUser.id);
        expect(response.body.expiryDate).toBeDefined();
    }));
    it('returns 404 when user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/login')
            .send({
            emailOrPhone: 'invalid@test.com',
            password: existingUserPassword,
        })
            .expect(404);
    }));
    it('returns 400 when password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/login')
            .send({
            emailOrPhone: existingUser.email,
            password: 'wrongpassword',
        })
            .expect(400);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Delete the test user
        yield existingUser.remove();
    }));
});
