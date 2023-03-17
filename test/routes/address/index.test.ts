import request from 'supertest';
import { app } from '../../../app';
import { Address, AddressDoc } from '../../../src/models/address';
import { token } from '../../setup';

describe('GET /api/address', () => {
    let addresses: AddressDoc[];

    beforeEach(async () => {
        // Create some sample addresses for testing
        const address1 = Address.build({
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
        const address2 = Address.build({
            name: 'Jane Doe',
            phone: '0987654321',
            house: 'House No. 456',
            street: 'Second Street',
            area: 'Area 52',
            district: 'District 10',
            state: 'State of Being',
            country: 'Country of Love',
            pincode: '654321'
        });
        addresses = [address1, address2];
        await Promise.all(addresses.map((address) => address.save()));
    });

    afterEach(async () => {
        // Remove the addresses created in the test
        await Promise.all(addresses.map((address) => address.remove()));
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
            .get('/api/address')
            .expect(401);
    });

    it('returns 200 with a list of addresses if request is valid', async () => {
        const response = await request(app)
            .get('/api/address')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.addresses.length).toEqual(2);
    });
});