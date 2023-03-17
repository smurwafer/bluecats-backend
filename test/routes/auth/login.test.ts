import request from 'supertest';
import { app } from '../../../app';
import { User, UserDoc } from '../../../src/models/user';
import bcrypt from 'bcryptjs';

describe('POST /api/auth/login', () => {
    let existingUser: UserDoc;
    let existingUserPassword = 'password123';

    
    beforeEach(async () => {
        let existingUserPasswordHash = await bcrypt.hash(existingUserPassword, 12);
        // Create a user for testing purposes
        existingUser = User.build({
            email: 'testuser@test.com',
            phone: '1234567890',
            password: existingUserPasswordHash,
            addresses: [],
            image: '',
            name: 'Test User',
            isAdmin: false,
        });
        await existingUser.save();
    });

    it('returns 200 and token on successful login', async () => { 
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            emailOrPhone: existingUser.email,
            password: existingUserPassword,
        })
        .expect(200);

        expect(response.body.token).toBeDefined();
        expect(response.body.id).toEqual(existingUser.id);
        expect(response.body.expiryDate).toBeDefined();
    });

    it('returns 404 when user is not found', async () => {
        await request(app)
        .post('/api/auth/login')
        .send({
            emailOrPhone: 'invalid@test.com',
            password: existingUserPassword,
        })
        .expect(404);
    });

    it('returns 400 when password is incorrect', async () => {
        await request(app)
        .post('/api/auth/login')
        .send({
            emailOrPhone: existingUser.email,
            password: 'wrongpassword',
        })
        .expect(400);
    });

    afterEach(async () => {
        // Delete the test user
        await existingUser.remove();
    });
});