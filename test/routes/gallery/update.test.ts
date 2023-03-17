import request from 'supertest';
import { app } from '../../../app';
import { Gallery, GalleryDoc } from '../../../src/models/gallery';
import { token } from '../../setup';

describe('PUT /api/gallery/:id', () => {
    let gallery: GalleryDoc;

    beforeEach(async () => {
        // create a gallery to update
        const image = `${__dirname}/images/test-image.jpeg`;
        const response = await request(app)
        .post('/api/gallery')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', 'Test Image')
        .field('type', 'image')
        .attach('file', image);
        gallery = response.body.gallery;
    }, 20000);

    afterEach(async () => {
        // delete the gallery created in beforeAll
        await Gallery.deleteOne({ id: gallery.id });
    });

    it('returns 401 if user is not authenticated', async () => {
        await request(app)
        .put(`/api/gallery/${gallery.id}`)
        .send({ caption: 'Updated Caption' })
        .expect(401);
    });

    it('returns 404 if gallery is not found', async () => {
        const nonExistingId = '605fe2e0251ab14f98e90392';
        await request(app)
        .put(`/api/gallery/${nonExistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ caption: 'Updated Caption', type: gallery.type, url: gallery.url })
        .expect(404);
    });

    it('returns 200 and updates gallery caption if request is valid', async () => {
        const response = await request(app)
        .put(`/api/gallery/${gallery.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ caption: 'Updated Caption', type: gallery.type, url: gallery.url })
        .expect(200);

        expect(response.body.gallery.caption).toEqual('Updated Caption');
    });

    it('returns 200 and updates gallery type if request is valid', async () => {
        const response = await request(app)
        .put(`/api/gallery/${gallery.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ type: 'video', caption: gallery.caption, url: gallery.url })
        .expect(200);

        expect(response.body.gallery.type).toEqual('Video');
    });
});