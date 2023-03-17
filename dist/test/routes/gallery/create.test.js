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
describe('POST /api/gallery', () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield gallery_1.Gallery.deleteMany({});
    }));
    it('returns 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/gallery')
            .expect(401);
    }));
    it('return 201 and creates a new gallery if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = `${__dirname}/images/test-image.jpeg`;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/gallery')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .field('caption', 'Test Image')
            .field('type', 'image')
            .attach('file', image)
            .expect(201);
        expect(response.body.message).toEqual('gallery created successfully');
        expect(response.body.gallery).toBeDefined();
        expect(response.body.gallery.url).toContain('images/');
        expect(response.body.gallery.type).toEqual('Image');
    }), 10000);
    it('returns 201 and creates a new video gallery if request is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const video = `${__dirname}/videos/test-video.mp4`;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/gallery')
            .set('Authorization', `Bearer ${setup_1.token}`)
            .field('caption', 'Test Video')
            .field('type', 'video')
            .attach('file', video)
            .expect(201);
        expect(response.body.message).toEqual('gallery created successfully');
        expect(response.body.gallery).toBeDefined();
        expect(response.body.gallery.url).toContain('videos/');
        expect(response.body.gallery.type).toEqual('Video');
    }), 20000);
});
