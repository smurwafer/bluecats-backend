import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.set('strictQuery', false);
dotenv.config();

declare global {
  namespace NodeJS {
    interface Global {
      signin(userId?: string): string[];
    }
  }
}

const startServer = async () => {
    mongo = await MongoMemoryServer.create();
    await mongo.ensureInstance();
    const uri = mongo.getUri();
    console.log(`MongoDB memory server started at ${uri}`);
    return uri;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'testsecretkey';
    process.env.NODE_ENV = 'test';
    const mongoUri = await startServer();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

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

export const sign = (email = 'test@test.com', phone = '1234567890', isAdmin = false) => { 
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = { id, email, phone, isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!);
    return {token, id};
}

const token = sign().token;
const adminToken = sign('admin@test.com', '3214567890', true).token;

export { token, adminToken };