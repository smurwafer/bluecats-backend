import request from 'supertest';
import { app } from '../../../app';
import { Order } from '../../../src/models/order';
import { OrderState } from '../../../src/utility/order-state';
import { token, adminToken } from '../../setup';

describe('PUT /api/order', () => {
    let orderId: string;

    beforeEach(async () => {
        const order = Order.build({
            image: 'test image',
            sketch: 'test sketch',
            caption: 'test caption',
            cost: 100,
            user: 'test user',
            address: 'test address',
            needVideo: true,
            private: true,
            state: OrderState.BOOKED,
        });
        await order.save();
        orderId = order.id;
    });

    afterEach(async () => {
        // Delete the order created for testing
        await Order.deleteMany({});
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
            .put(`/api/order/${orderId}`)
            .send({
                image: 'updated image',
                sketch: 'updated sketch',
                caption: 'updated caption',
                cost: 200,
                user: 'updated user',
                address: 'updated address',
                needVideo: false,
                private: false,
            })
            .expect(401);
    });

    it('returns 404 if order is not found', async () => {
        await request(app)
            .put(`/api/order/605fe2e0251ab14f98e90392`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                image: 'updated image',
                sketch: 'updated sketch',
                caption: 'updated caption',
                cost: 200,
                user: 'updated user',
                address: 'updated address',
                needVideo: false,
                private: false,
            })
            .expect(404);
    });

    it('updates the order if input is valid and user is authenticated', async () => {
        await request(app)
            .put(`/api/order/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                image: 'updated image',
                sketch: 'updated sketch',
                caption: 'updated caption',
                cost: 200,
                user: 'updated user',
                address: 'updated address',
                needVideo: false,
                private: false,
            })
            .expect(204);

        const updatedOrderResponse = await request(app)
            .get(`/api/order/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(updatedOrderResponse.body.order.image).toEqual('updated image');
        expect(updatedOrderResponse.body.order.sketch).toEqual('updated sketch');
        expect(updatedOrderResponse.body.order.caption).toEqual('updated caption');
        expect(updatedOrderResponse.body.order.cost).toEqual(200);
        expect(updatedOrderResponse.body.order.user).toEqual('updated user');
        expect(updatedOrderResponse.body.order.address).toEqual('updated address');
        expect(updatedOrderResponse.body.order.private).toEqual(false);
    });

    it('returns a 404 error if the order does not exist', async () => {
        const id = '605fe2e0251ab14f98e90392';
        const move = 'forward';
        await request(app)
            .put(`/api/change-order-state/${id}?move=${move}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({})
            .expect(404);
    });

    it('returns a 401 error if the user is not authenticated', async () => {
        const move = 'forward';
        await request(app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .send({})
            .expect(401);
    });

    it('returns a 403 error if the user is not admin', async () => {
        const move = 'forward';
        await request(app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .set('Authorization', `Bearer ${token}`)
            .send({})
            .expect(403);
    });

    it('updates the order state to WORKING if currentState is BOOKED and move is forward', async () => {
        const move = 'forward';
        const res = await request(app)
            .put(`/api/change-order-state/${orderId}?move=${move}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({})
            .expect(204);
        
        expect(res.body).toEqual({});
        const updatedOrder = await Order.findById(orderId);
        expect(updatedOrder).toBeDefined();
        expect(updatedOrder?.state).toEqual(OrderState.WORKING);
    });
});