"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const gallery_1 = require("../../../src/models/gallery");
const setup_1 = require("../../setup");
describe('PUT /api/gallery/:id', () => {
    let gallery;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // create a gallery to update
        const image = `${__dirname}/images/test-image.jpeg`;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/gallery')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .field('caption', 'Test Image')
            .field('type', 'image')
            .attach('file', image);
        gallery = response.body.gallery;
    }), 20000);
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // delete the gallery created in beforeAll
        yield gallery_1.Gallery.deleteOne({ id: gallery.id });
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/gallery/${gallery.id}`)
            .send({ caption: 'Updated Caption' })
            .expect(401);
    }));
    it('returns 404 if gallery is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = '605fe2e0251ab14f98e90392';
        yield (0, supertest_1.default)(app_1.app)
            .put(`/api/gallery/${nonExistingId}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({ caption: 'Updated Caption', type: gallery.type, url: gallery.url })
            .expect(404);
    }));
    it('returns 200 and updates gallery caption if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/api/gallery/${gallery.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({ caption: 'Updated Caption', type: gallery.type, url: gallery.url })
            .expect(200);
        expect(response.body.gallery.caption).toEqual('Updated Caption');
    }));
    it('returns 200 and updates gallery type if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/api/gallery/${gallery.id}`)
            .set('Authorization', `Bearer ${setup_1.token}`)
            .send({ type: 'video', caption: gallery.caption, url: gallery.url })
            .expect(200);
        expect(response.body.gallery.type).toEqual('Video');
    }));
});
