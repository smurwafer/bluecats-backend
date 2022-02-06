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
exports.GalleryIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const s3_1 = require("../../../s3");
const require_auth_1 = require("../../middlewares/require-auth");
const gallery_1 = require("../../models/gallery");
const Router = express_1.default.Router();
exports.GalleryIndexRouter = Router;
Router.get('/api/gallery', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const galleries = yield gallery_1.Gallery.find();
    res.status(200).send({
        message: 'galleries fetched successfully',
        galleries,
    });
}));
Router.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = (0, s3_1.getFileStream)(key);
    readStream.pipe(res);
});
