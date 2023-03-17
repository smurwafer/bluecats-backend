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
exports.GalleryUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const not_found_error_1 = require("../../exceptions/not-found-error");
const require_auth_1 = require("../../middlewares/require-auth");
const gallery_1 = require("../../models/gallery");
const gallery_type_1 = require("../../utility/gallery-type");
const Router = express_1.default.Router();
exports.GalleryUpdateRouter = Router;
Router.put('/api/gallery/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { url, caption, type } = req.body;
        let modifiedType = gallery_type_1.GalleryType.IMAGE;
        if (type === 'video')
            modifiedType = gallery_type_1.GalleryType.VIDEO;
        const gallery = yield gallery_1.Gallery.findById(id);
        if (!gallery)
            throw new not_found_error_1.NotFoundError('No such gallery exists!');
        gallery.set({
            url, caption, type: modifiedType,
        });
        yield gallery.save();
        res.status(200).send({
            message: 'gallery updated successfully',
            gallery,
        });
    }
    catch (err) {
        next(err);
    }
}));
