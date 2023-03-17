import request from 'supertest';
import { app } from '../../../app';
import { Gallery } from '../../../src/models/gallery';
import { token } from '../../setup';

describe('DELETE /api/gallery/:id', () => {
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
        .delete(`/api/gallery/${galleryId}`)
        .expect(401);
    });

    it('returns 404 if gallery does not exist', async () => {
        const nonExistingId = '605fe2e0251ab14f98e90392';
        await request(app)
        .delete(`/api/gallery/${nonExistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('return 202 and deletes the gallery if request is valid', async () => {
        await request(app)
        .delete(`/api/gallery/${galleryId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(202);
    });
});