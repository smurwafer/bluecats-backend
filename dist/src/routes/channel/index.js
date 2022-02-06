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
exports.ChannelIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const channel_1 = require("../../models/channel");
const Router = express_1.default.Router();
exports.ChannelIndexRouter = Router;
Router.get('/api/channel', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield channel_1.Channel.find().populate('gallery').populate({
            path: 'profile',
            // populate: [{
            //     path: 'photo',
            //     model: 'Gallery',
            // }, {
            //     path: 'theme',
            //     model: 'Gallery',
            // }],
        });
        res.status(200).send({
            message: 'Channels received successfully',
            channels,
        });
    }
    catch (err) {
        next(err);
    }
}));
