import request from 'supertest';
import { app } from '../../../app';
import { Gallery } from '../../../src/models/gallery';
import { token } from '../../setup';

describe('POST /api/gallery', () => {
    afterEach(async () => {
        await Gallery.deleteMany({});
    });

    it('returns 401 if user is not authenticated', async () => {
        const response = await request(app)
        .post('/api/gallery')
        .expect(401);
    });

    it('return 201 and creates a new gallery if request is valid', async () => {
        const image = `${__dirname}/images/test-image.jpeg`;

        const response = await request(app)
        .post('/api/gallery')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', 'Test Image')
        .field('type', 'image')
        .attach('file', image)
        .expect(201);

        expect(response.body.message).toEqual('gallery created successfully');
        expect(response.body.gallery).toBeDefined();
        expect(response.body.gallery.url).toContain('images/');
        expect(response.body.gallery.type).toEqual('Image');
    }, 10000);

    it('returns 201 and creates a new video gallery if request is valid', async () => {
        const video = `${__dirname}/videos/test-video.mp4`;
        const response = await request(app)
        .post('/api/gallery')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', 'Test Video')
        .field('type', 'video')
        .attach('file', video)
        .expect(201);

        expect(response.body.message).toEqual('gallery created successfully');
        expect(response.body.gallery).toBeDefined();
        expect(response.body.gallery.url).toContain('videos/');
        expect(response.body.gallery.type).toEqual('Video');
    }, 20000);
});