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
exports.StoryIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const story_1 = require("../../models/story");
const vote_1 = require("../../models/vote");
const Router = express_1.default.Router();
exports.StoryIndexRouter = Router;
;
Router.get('/api/story', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // /api/story?page=1
    // /api/story?author=fweofiqqp
    const page = parseInt(req.query.page);
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const author = req.query.author;
    // /api/story?hashtag=horror
    const hashtag = req.query.hashtag;
    if (author) {
        const stories = yield story_1.Story.find({ author }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);
        return res.status(200).send({
            message: 'user stories fetched successfully',
            stories,
        });
    }
    if (hashtag) {
        const stories = yield story_1.Story.find({ hashtags: hashtag }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);
        return res.status(200).send({
            message: 'hashtag stories fetched successfully',
            stories,
        });
    }
    const stories = yield story_1.Story.find().sort({
        'createdAt': -1,
    }).populate('author').populate('gallery').skip(offset).limit(perPage);
    res.status(200).send({
        message: 'stories fetched successfully',
        stories,
    });
}));
Router.get('/api/trending', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // /api/trending?page=1
    // /api/trending?author=fweofiqqp
    const page = parseInt(req.query.page);
    const perPage = 10;
    const offset = (page - 1) * perPage;
    // /api/trending?hashtag=horror
    const hashtag = req.query.hashtag;
    if (hashtag) {
        const stories = yield story_1.Story.find({ hashtags: hashtag }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);
        const promisedTrending = stories.map((s) => __awaiter(void 0, void 0, void 0, function* () {
            const upvotes = yield vote_1.Vote.find({ story: s.id, type: 'up' }).countDocuments();
            const downvotes = yield vote_1.Vote.find({ story: s.id, type: 'down' }).countDocuments();
            const story = yield (yield s.populate('author')).populate('gallery');
            const t = {
                story,
                upvotes,
                downvotes,
            };
            return t;
        }));
        let trending = [];
        yield (() => __awaiter(void 0, void 0, void 0, function* () {
            trending = yield Promise.all(promisedTrending);
        }))();
        trending.sort((t1, t2) => {
            return (t1.upvotes + t1.downvotes) - (t2.upvotes + t2.downvotes);
        });
        trending.length = Math.min(trending.length, 10);
        return res.status(200).send({
            message: 'trending fetched successfully',
            trending,
        });
    }
    const stories = yield story_1.Story.find().sort({
        'createdAt': -1,
    }).populate('author').populate('gallery').skip(offset).limit(perPage);
    const promisedTrending = stories.map((s) => __awaiter(void 0, void 0, void 0, function* () {
        const upvotes = yield vote_1.Vote.find({ story: s.id, type: 'up' }).countDocuments();
        const downvotes = yield vote_1.Vote.find({ story: s.id, type: 'down' }).countDocuments();
        const story = yield (yield s.populate('author')).populate('gallery');
        const t = {
            story,
            upvotes,
            downvotes,
        };
        return t;
    }));
    let trending = [];
    yield (() => __awaiter(void 0, void 0, void 0, function* () {
        trending = yield Promise.all(promisedTrending);
    }))();
    trending.sort((t1, t2) => {
        return (t1.upvotes + t1.downvotes) - (t2.upvotes + t2.downvotes);
    });
    trending.length = Math.min(trending.length, 10);
    res.status(200).send({
        message: 'trending fetched successfully',
        trending,
    });
}));
