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
describe('PUT /api/user/:id', () => {
    let userId;
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // user = new User({
        //     email: 'testuser@test.com',
        //     phone: '1234567890',
        //     password: 'password123',
        //     addresses: [],
        //     image: '',
        //     name: 'Test User',
        //     isAdmin: false,
        // });
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
        userId = response.body.id;
    }), 20000);
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/user/${userId}`)
            .send({
            email: 'newemail@test.com',
            phone: '1234567890',
            name: 'New Name',
            isAdmin: true,
        })
            .expect(401);
    }));
    it('returns 404 if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/api/user/60f8c9287e784a3b586a3b3e')
            .set('Authorization', `Bearer ${token}`)
            .send({
            email: 'newemail@test.com',
            phone: '1234567890',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'New Name',
            isAdmin: true,
        })
            .expect(404);
    }));
    it('returns 400 if email or phone is already in use by another user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new user_1.User({
            email: 'newuser@test.com',
            phone: '1234567890',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'New User',
            isAdmin: false,
        });
        yield newUser.save();
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            email: newUser.email,
            phone: '1234567890',
            name: 'New Name',
            isAdmin: true,
        })
            .expect(400);
        yield newUser.remove();
    }));
    it('return 204 and updates the user if input is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            email: 'newemail@test.com',
            phone: '1234567890',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'New Name',
            isAdmin: true,
        })
            .expect(204);
        const updatedUser = yield user_1.User.findById(userId);
        expect(updatedUser).not.toBeNull();
        expect(updatedUser.email).toEqual('newemail@test.com');
        expect(updatedUser.phone).toEqual('1234567890');
        expect(updatedUser.name).toEqual('New Name');
        expect(updatedUser.isAdmin).toEqual(true);
    }));
});
