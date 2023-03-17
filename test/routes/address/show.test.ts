import request from 'supertest';
import { app } from '../../../app';
import { Address, AddressDoc } from '../../../src/models/address';
import { token } from '../../setup';

describe('GET /api/address/:id', () => {
    let address: AddressDoc;

    beforeEach(async () => {
        // Create a new address for testing
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
            .get(`/api/address/${address.id}`)
            .expect(401);
    });

    it('returns 404 if address is not found', async () => {
        await request(app)
            .get('/api/address/123456789012345678901234')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });

    it('returns 200 with the address object if request is valid', async () => {
        const response = await request(app)
            .get(`/api/address/${address.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.address.name).toEqual('John Doe');
        expect(response.body.address.phone).toEqual('1234567890');
        expect(response.body.address.house).toEqual('House No. 123');
        expect(response.body.address.street).toEqual('Main Street');
        expect(response.body.address.area).toEqual('Area 51');
        expect(response.body.address.district).toEqual('District 9');
        expect(response.body.address.state).toEqual('State of Mind');
        expect(response.body.address.country).toEqual('Country of God');
        expect(response.body.address.pincode).toEqual('123456');
    });
});