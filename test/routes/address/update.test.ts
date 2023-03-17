import request from 'supertest';
import { app } from '../../../app';
import { Address, AddressDoc } from '../../../src/models/address';
import { token } from '../../setup';

describe('PUT /api/address/:id', () => {
    let address : AddressDoc;

    beforeEach(async () => {
        // Create a new address to update in the test
        address = Address.build({
            name: 'John Doe',
            phone: '1234567890',
            house: 'House No. 123',
            street: 'Main Street',
            area: 'Area 51',
            district: 'District 9',
            state: 'State of Mind',
            country: 'Country of God',
            pincode: '123456'
        });
        await address.save();
    });

    afterEach(async () => {
        // Remove the address created in the test
        await address.remove();
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(401);
    });

    it('returns 404 if address is not found', async () => {
        await request(app)
            .put(`/api/address/123456789012345678901234`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(404);
    });

    it('returns 400 if invalid name is provided', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: '',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(400);
    });

    it('returns 400 if invalid phone is provided', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(400);
    });

    it('returns 400 if invalid state is provided', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: '',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(400);
    });

    it('returns 400 if invalid country is provided', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: '',
                pincode: '654321'
            })
            .expect(400);
    });

    it('returns 400 if invalid pincode is provided', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: ''
            })
            .expect(400);
    });

    it('returns 204 if address update is successful', async () => {
        await request(app)
            .put(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                phone: '1234567890',
                house: 'Updated House No. 123',
                street: 'Updated Main Street',
                area: 'Updated Area 51',
                district: 'Updated District 9',
                state: 'Updated State of Mind',
                country: 'Updated Country of God',
                pincode: '654321'
            })
            .expect(204);
    });
});