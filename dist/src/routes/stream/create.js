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
exports.StreamCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const stream_1 = require("../../models/stream");
const story_validator_1 = require("../../validators/stream/story-validator");
const Router = express_1.default.Router();
exports.StreamCreateRouter = Router;
Router.post('/api/stream', require_auth_1.requireAuth, story_validator_1.StreamValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type, hashtags, thumbnail, gallery, channel } = req.body;
        const stream = stream_1.Stream.build({
            title, description, type, hashtags, thumbnail, gallery, channel,
        });
        yield stream.save();
        res.status(201).send({
            message: 'Stream created successfully',
            stream,
        });
    }
    catch (err) {
        next(err);
    }
}));
