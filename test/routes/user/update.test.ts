import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../src/models/user';

describe('PUT /api/user/:id', () => {
    let userId: string;
    let token: string;

    beforeEach(async () => {
        // user = new User({
        //     email: 'testuser@test.com',
        //     phone: '1234567890',
        //     password: 'password123',
        //     addresses: [],
        //     image: '',
        //     name: 'Test User',
        //     isAdmin: false,
        // });

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
            .put(`/api/user/${userId}`)
            .send({
                email: 'newemail@test.com',
                phone: '1234567890',
                name: 'New Name',
                isAdmin: true,
            })
            .expect(401);
    });

    it('returns 404 if user is not found', async () => {
        await request(app)
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
    });

    it('returns 400 if email or phone is already in use by another user', async () => {
        const newUser = new User({
            email: 'newuser@test.com',
            phone: '1234567890',
            password: 'password123',
            addresses: [],
            image: '',
            name: 'New User',
            isAdmin: false,
        });

        await newUser.save();

        await request(app)
            .put(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: newUser.email,
                phone: '1234567890',
                name: 'New Name',
                isAdmin: true,
            })
            .expect(400);

        await newUser.remove();
    });

    it('return 204 and updates the user if input is valid', async () => {
        await request(app)
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

        const updatedUser = await User.findById(userId);

        expect(updatedUser).not.toBeNull();
        expect(updatedUser!.email).toEqual('newemail@test.com');
        expect(updatedUser!.phone).toEqual('1234567890');
        expect(updatedUser!.name).toEqual('New Name');
        expect(updatedUser!.isAdmin).toEqual(true);
    });
});