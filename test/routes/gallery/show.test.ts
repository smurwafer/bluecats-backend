import request from 'supertest';
import { app } from '../../../app';
import { Gallery } from '../../../src/models/gallery';
import { token } from '../../setup';

describe('GET /api/gallery/:id', () => {
    let galleryId: string;

    beforeEach(async () => {
        const image = `${__dirname}/images/test-image.jpeg`;
        const response = await request(app)
        .post('/api/gallery')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', 'Test Image')
        .field('type', 'image')
        .attach('file', image)
        .expect(201);

        galleryId = response.body.gallery.id;
    }, 20000);

    afterEach(async () => {
        await Gallery.deleteMany({});
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
        .get(`/api/gallery/${galleryId}`)
        .expect(401);
    });

    it('returns 404 if gallery does not exist', async () => {
        await request(app)
        .get('/api/gallery/60f8c9287e784a3b586a3b3e')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('returns the gallery if it exists and user is authenticated', async () => {
        console.log(galleryId);

        const response = await request(app)
        .get(`/api/gallery/${galleryId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        expect(response.body.gallery).toBeDefined();
        expect(response.body.gallery.url).toContain('images/');
        expect(response.body.gallery.type).toEqual('Image');
    }, 20000);
});