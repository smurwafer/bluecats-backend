import request from 'supertest';
import { app } from '../../../app';
import { OrderState } from '../../../src/utility/order-state';
import { token } from '../../setup';

describe('POST /api/order', () => {
    it('returns 401 if user is not authenticated', async () => {
        const response = await request(app)
        .post('/api/order')
        .send({
            image: '123456789012345678901234',
            sketch: '123456789012345678901235',
            caption: 'Order caption',
            cost: 100,
            user: '123456789012345678901236',
            address: '123456789012345678901237',
            needVideo: false,
            private: false,
        })
        .expect(401);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 400 if invalid request body is provided', async () => {
        const response = await request(app)
        .post('/api/order')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 201 if order is created successfully', async () => {
        const response = await request(app)
        .post('/api/order')
        .set('Authorization', `Bearer ${token}`)
        .send({
            image: '123456789012345678901234',
            sketch: '123456789012345678901235',
            caption: 'Order caption',
            cost: 100,
            user: '123456789012345678901236',
            address: '123456789012345678901237',
            needVideo: false,
            private: false,
        })
        .expect(201);

        expect(response.body.order).toBeDefined();
        expect(response.body.order.state).toEqual(OrderState.BOOKED);
    });
});