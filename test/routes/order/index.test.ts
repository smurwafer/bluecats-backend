import request from 'supertest';
import { app } from '../../../app';
import { Order } from '../../../src/models/order';
import { OrderState } from '../../../src/utility/order-state';
import { token, adminToken, sign } from '../../setup';

describe('GET /api/order', () => {
    it('returns 401 if user is not authenticated', async () => {
        const response = await request(app)
        .get('/api/order')
        .send()
        .expect(401);

        expect(response.body.errors).toBeDefined();
    });

    it('returns orders belonging to the authenticated user', async () => {
        const { id: userId, token: userToken } = sign();
        const { id: adminId, token: adminToken } = sign('admin@test.com', '3214567890', true);
        const adminOrder = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await adminOrder.save();

        const userOrder = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: userId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await userOrder.save();

        const response = await request(app)
        .get('/api/order')
        .set('Authorization', `Bearer ${userToken}`)
        .send()
        .expect(200);

        expect(response.body.orders).toHaveLength(1);
        expect(response.body.orders[0].id).toEqual(userOrder.id);
    });
});

describe('GET /api/all-order', () => {
    it('returns 401 if user is not authenticated', async () => {
        const response = await request(app)
        .get('/api/all-order')
        .send()
        .expect(401);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 403 if user is not an admin', async () => {
        const response = await request(app)
        .get('/api/all-order')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(403);

        expect(response.body.errors).toBeDefined();
    });

    it('returns all orders if user is an admin', async () => {
        const { id: userId, token: userToken } = sign();
        const { id: adminId, token: adminToken } = sign('admin@test.com', '3214567890', true);
        const adminOrder = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await adminOrder.save();

        const userOrder = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: userId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await userOrder.save();
        
        const response = await request(app)
        .get('/api/all-order')
        .set('Authorization', `Bearer ${adminToken}`)
        .send()
        .expect(200);

        expect(response.body.orders).toHaveLength(2);
    });

    it('returns orders belonging to the specified user', async () => {
        const { id: adminId, token: adminToken } = sign('admin@test.com', '3214567890', true);

        const adminOrder = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: adminId,
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await adminOrder.save();

        const response = await request(app)
        .get(`/api/all-order?userId=${adminOrder.user}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send()
        .expect(200);

        expect(response.body.orders).toHaveLength(1);
        expect(response.body.orders[0].id).toEqual(adminOrder.id);
    });
});