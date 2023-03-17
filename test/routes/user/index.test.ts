import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../src/models/user';

describe('GET /api/user', () => {
    let token: string;

    beforeEach(async () => {
        const response = await request(app)
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
    }, 20000);

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
            .get('/api/user')
            .expect(401);
    });

    it('returns 200 and all users if user is authenticated and is an admin', async () => {
        const response = await request(app)
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

        const res = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        expect(res.body.users.length).toEqual(2);
    });

    it('returns 200 and an empty array if user is authenticated and is not an admin', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.users.length).toEqual(0);
    });
});