import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../src/models/user';

describe('DELETE /api/user/:id', () => {
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
        })
        .expect(201);

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
        await request(app).delete(`/api/user/${userId}`).expect(401);
    });

    it('returns 404 if user is not found', async () => {
        await request(app)
        .delete('/api/user/60f8c9287e784a3b586a3b3e')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('returns 204 and deletes the user if user is found', async () => {
        await request(app)
        .delete(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

        const deletedUser = await User.findById(userId);

        expect(deletedUser).toBeNull();
    });
});
