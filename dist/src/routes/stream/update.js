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
exports.StreamUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const stream_1 = require("../../models/stream");
const story_validator_1 = require("../../validators/stream/story-validator");
const Router = express_1.default.Router();
exports.StreamUpdateRouter = Router;
Router.put('/api/stream/:id', require_auth_1.requireAuth, story_validator_1.StreamValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const stream = yield stream_1.Stream.findById(id);
        if (!stream) {
            throw new Error('Stream not found!');
        }
        const { title, description, hashtags, gallery, channel } = req.body;
        stream.set({
            title, description, hashtags, gallery, channel
        });
        yield stream.save();
        res.status(200).send({
            message: 'Stream updated successfully',
            stream,
        });
    }
    catch (err) {
        next(err);
    }
}));
