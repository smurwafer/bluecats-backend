import request from 'supertest';
import { app } from '../../../app';
import { Address, AddressDoc } from '../../../src/models/address';
import { token } from '../../setup';

describe('DELETE /api/address/:id', () => {
    let address: AddressDoc;

    beforeEach(async () => {
        // Create a new address to delete in the test
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
            .delete(`/api/address/${address.id}`)
            .expect(401);
    });

    it('returns 404 if address is not found', async () => {
        await request(app)
            .delete(`/api/address/123456789012345678901234`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });

    it('returns 204 if address deletion is successful', async () => {
        await request(app)
            .delete(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
    });
});