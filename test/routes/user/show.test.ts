import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../src/models/user';

describe('GET /api/user/:id', () => {
    let userId: string;
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
        userId = response.body.id;
    }, 20000);

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
            .get(`/api/user/${userId}`)
            .expect(401);
    });

    it('returns 404 if user is not found', async () => {
        await request(app)
            .get('/api/user/60f8c9287e784a3b586a3b3e')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });

    it('returns 200 and the user if found', async () => {
        const response = await request(app)
            .get(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.user.id).toEqual(userId);
        expect(response.body.user.email).toEqual('testuser@test.com');
        expect(response.body.user.phone).toEqual('1234567890');
        expect(response.body.user.name).toEqual('Test User');
        expect(response.body.user.isAdmin).toEqual(false);
    });
});