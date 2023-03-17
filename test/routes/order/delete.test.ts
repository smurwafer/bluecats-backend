import request from 'supertest';
import { app } from '../../../app';
import { Order } from '../../../src/models/order';
import { OrderState } from '../../../src/utility/order-state';
import { token } from '../../setup';

describe('DELETE /api/order/:id', () => {
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
        .delete(`/api/order/${order.id}`)
        .send()
        .expect(401);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 404 if order does not exist', async () => {
        const response = await request(app)
        .delete('/api/order/605fe2e0251ab14f98e90392')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(404);

        expect(response.body.errors).toBeDefined();
    });

    it('returns 204 and deletes the order', async () => {
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
        .delete(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(204);

        expect(response.body).toEqual({});
        const deletedOrder = await Order.findById(order.id);
        expect(deletedOrder).toBeNull();
    });
});