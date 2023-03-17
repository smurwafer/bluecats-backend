import request from 'supertest';
import { app } from '../../../app';
import { Address } from '../../../src/models/address';
import { token } from '../../setup';

describe('POST /api/address', () => { 
    it('returns 401 if user is not authenticated', async () => {
        await request(app)
        .post('/api/address')
        .send({
          name: 'John Doe',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: 'Country of God',
          pincode: '123456'
        })
        .expect(401);
    });
    
    it('returns 400 if invalid name is provided', async () => {
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: 'Country of God',
          pincode: '123456'
        })
        .expect(400);
    });
    
    it('returns 400 if invalid phone is provided', async () => {
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          phone: '',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: 'Country of God',
          pincode: '123456'
        })
        .expect(400);
    });
    
    it('returns 400 if invalid state is provided', async () => {
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: '',
          country: 'Country of God',
          pincode: '123456'
        })
        .expect(400);
    });
    
    it('returns 400 if invalid country is provided', async () => {
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: '',
          pincode: '123456'
        })
        .expect(400);
    });
    
    it('returns 400 if invalid pincode is provided', async () => {
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: 'Country of God',
          pincode: ''
        })
        .expect(400);
    });
    
    it('returns 201 and creates an address with valid inputs', async () => {
      let addresses = await Address.find({});
      expect(addresses.length).toEqual(0);
    
      await request(app)
        .post('/api/address')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          phone: '1234567890',
          house: 'House No. 123',
          street: 'Main Street',
          area: 'Area 51',
          district: 'District 9',
          state: 'State of Mind',
          country: 'Country of God',
          pincode: '123456'
        })
        .expect(201);
    
      addresses = await Address.find({});
      expect(addresses.length).toEqual(1);
    });
});