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
exports.adminToken = exports.token = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
mongoose_1.default.set('strictQuery', false);
dotenv_1.default.config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongo.ensureInstance();
    const uri = mongo.getUri();
    console.log(`MongoDB memory server started at ${uri}`);
    return uri;
});
let mongo;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'testsecretkey';
    process.env.NODE_ENV = 'test';
    const mongoUri = yield startServer();
    yield mongoose_1.default.connect(mongoUri);
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.clearAllMocks();
    const collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongo.stop();
    yield mongoose_1.default.connection.close();
}));
// global.signin = (userId?: string) => {
//   // Build a JWT payload. { id, email }
//     const payload = {
//         id: userId || new mongoose.Types.ObjectId().toHexString(),
//         email: 'test@test.com',
//         phone: '1234567890',
//     };
//     // Create the JWT
//     const token = jwt.sign(payload, process.env.JWT_KEY!);
//     // Build session Object. { jwt: MY_JWT }
//     const session = { jwt: token };
//     // Turn that session into JSON
//     const sessionJSON = JSON.stringify(session);
//     // Take JSON and encode it as base64
//     const base64 = Buffer.from(sessionJSON).toString('base64');
//     // return a string that the cookie with the encoded data
//     return [`express:sess=${base64}`];
// };
const sign = (email = 'test@test.com', phone = '1234567890', isAdmin = false) => {
    const id = new mongoose_1.default.Types.ObjectId().toHexString();
    const payload = { id, email, phone, isAdmin };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
    return { token, id };
};
exports.sign = sign;
const token = (0, exports.sign)().token;
exports.token = token;
const adminToken = (0, exports.sign)('admin@test.com', '3214567890', true).token;
exports.adminToken = adminToken;
