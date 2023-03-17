import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../src/models/user';

describe('POST /api/auth/signup', () => {
    it('returns 201 and token on successful signup', async () => {
        const response = await request(app)
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
    });

    it('returns 400 when email is already registered', async () => {
        // Create a user with the same email before running this test
        const existingUser = User.build({
            email: 'testuser@test.com',
            phone: '0987654321',
            name: 'Existing User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        });
        await existingUser.save();

        await request(app)
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

        await existingUser.remove();
    });

    it('returns 400 when phone is already registered', async () => {
        // Create a user with the same phone before running this test
        const existingUser = User.build({
            email: 'existinguser@test.com',
            phone: '1234567890',
            name: 'Existing User',
            password: 'password123',
            addresses: [],
            image: '',
            isAdmin: false,
        });
        
        await existingUser.save();

        await request(app)
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

        await existingUser.remove();
    });
});