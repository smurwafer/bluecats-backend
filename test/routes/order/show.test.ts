import request from 'supertest';
import { app } from '../../../app';
import { Order } from '../../../src/models/order';
import { OrderState } from '../../../src/utility/order-state';
import { token } from '../../setup';

describe('GET /api/order/:id', () => {
    it('returns 401 if user is not authenticated', async () => {
        const order = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await order.save();

        const response = await request(app)
            .get(`/api/order/${order.id}`)
            .send()
            .expect(401);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 404 if order does not exist', async () => {
        const response = await request(app)
            .get('/api/order/605fe2e0251ab14f98e90392')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(404);

        expect(response.body.errors).toBeDefined();
    });

    it('returns the order with the given id', async () => {
        const order = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 10,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: false,
            state: OrderState.BOOKED,
        });
        await order.save();

        const response = await request(app)
            .get(`/api/order/${order.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);

        expect(response.body.order.id).toEqual(order.id);
        expect(response.body.order.image).toEqual(order.image);
        expect(response.body.order.sketch).toEqual(order.sketch);
        expect(response.body.order.caption).toEqual(order.caption);
        expect(response.body.order.cost).toEqual(order.cost);
        expect(response.body.order.user).toEqual(order.user);
        expect(response.body.order.address).toEqual(order.address);
        expect(response.body.order.needVideo).toEqual(order.needVideo);
        expect(response.body.order.private).toEqual(order.private);
        expect(response.body.order.state).toEqual(order.state);
    });
});