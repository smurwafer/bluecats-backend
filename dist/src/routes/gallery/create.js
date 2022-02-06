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
exports.GalleryCreateRouter = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const express_1 = __importDefault(require("express"));
const s3_1 = require("../../../s3");
const require_auth_1 = require("../../middlewares/require-auth");
const gallery_1 = require("../../models/gallery");
const gallery_type_1 = require("../../utility/gallery-type");
const Router = express_1.default.Router();
exports.GalleryCreateRouter = Router;
const unlink = util_1.default.promisify(fs_1.default.unlink);
Router.post('/api/gallery', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { caption, type, url } = req.body;
        let modifiedType = gallery_type_1.GalleryType.IMAGE;
        let imageUrl = "", videoUrl = "", isResourceUrl = false;
        if (url && url.trim().length > 0) {
            isResourceUrl = true;
            if (type == 'video') {
                videoUrl = url;
            }
            else {
                imageUrl = url;
            }
        }
        if (type === 'video') {
            modifiedType = gallery_type_1.GalleryType.VIDEO;
            if (req.files && req.files.length > 0) {
                const file = req.files[0];
                isResourceUrl = false;
                videoUrl = file.path;
                const result = yield (0, s3_1.uploadFile)(file);
                videoUrl = 'videos/' + result.Key;
                yield unlink(file.path);
            }
        }
        else {
            if (req.files && req.files.length > 0) {
                const file = req.files[0];
                isResourceUrl = false;
                imageUrl = file.path;
                const result = yield (0, s3_1.uploadFile)(file);
                imageUrl = 'images/' + result.Key;
                yield unlink(file.path);
            }
        }
        const gallery = gallery_1.Gallery.build({
            imageUrl, videoUrl, caption, type: modifiedType, isResourceUrl
        });
        yield gallery.save();
        res.status(201).send({
            message: 'gallery created successfully',
            gallery,
        });
    }
    catch (err) {
        next(err);
    }
}));
