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
exports.SearchIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const fuse_js_1 = __importDefault(require("fuse.js"));
const user_1 = require("../../models/user");
const stream_1 = require("../../models/stream");
const channel_1 = require("../../models/channel");
const profile_1 = require("../../models/profile");
const Router = express_1.default.Router();
exports.SearchIndexRouter = Router;
Router.get('/api/search', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // api/search/?type=stream&input=text
        const type = req.query.type;
        const input = req.query.input;
        let fuse;
        if (type === 'stream') {
            const streams = yield stream_1.Stream.find().populate('channel').populate('gallery');
            fuse = new fuse_js_1.default(streams, {
                includeScore: true,
                keys: ['title', 'hashtags', 'type'],
            });
        }
        else if (type === 'channel') {
            const channels = yield channel_1.Channel.find().populate('holders').populate('gallery');
            fuse = new fuse_js_1.default(channels, {
                includeScore: true,
                keys: ['name', 'hashtags', 'type'],
            });
        }
        else if (type === 'user') {
            const users = yield user_1.User.find();
            const profiles = yield profile_1.Profile.find();
            fuse = new fuse_js_1.default([...users, ...profiles], {
                includeScore: true,
                keys: ['userName', 'email', 'name']
            });
        }
        const results = fuse ? fuse.search(input) : [];
        res.status(200).send({
            message: 'Search results fetched succesfully',
            results,
        });
    }
    catch (err) {
        next(err);
    }
}));
