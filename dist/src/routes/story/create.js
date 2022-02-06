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
exports.StoryCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const casino_1 = require("../../models/casino");
const dashboard_1 = require("../../models/dashboard");
const gamble_1 = require("../../models/gamble");
const story_1 = require("../../models/story");
const hat_1 = require("../../utility/hat");
const story_validator_1 = require("../../validators/story/story-validator");
const Router = express_1.default.Router();
exports.StoryCreateRouter = Router;
const max = (a, b) => {
    return a > b ? a : b;
};
const min = (a, b) => {
    return a < b ? a : b;
};
const updateAllDashboards = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamble = yield gamble_1.Gamble.findOne({
            story: id,
        });
        if (!gamble) {
            throw new Error('No such gamble exists');
        }
        const casinos = yield casino_1.Casino.find({
            gamble: gamble.id,
        });
        casinos.map((c) => __awaiter(void 0, void 0, void 0, function* () {
            let r = 0;
            // const nextFetchTime = new Date(gamble.lastfetched).getTime();
            // if (new Date().getTime() > nextFetchTime) {
            if (gamble.up > gamble.down) {
                if (c.type === 'author') {
                    // r += gamble.up / 20;
                    r += gamble.up * 10;
                }
                else {
                    if (c.vote === 'up') {
                        // r += gamble.up / 200;
                        r += gamble.up * 2;
                    }
                    else {
                        // r -= gamble.up / 100;
                        r -= gamble.up;
                    }
                }
            }
            else if (gamble.up < gamble.down) {
                if (c.type === 'author') {
                    // r -= gamble.down / 10;
                    r -= gamble.down * 10;
                }
                else {
                    if (c.vote === 'up') {
                        // r -= gamble.down / 100;
                        r -= gamble.down * 2;
                    }
                    else {
                        // r += gamble.down / 100;
                        r += gamble.down * 2;
                    }
                }
            }
            // }
            const dashboard = yield dashboard_1.Dashboard.findOne({ user: c.gambler });
            if (dashboard) {
                const rating = Math.round(dashboard.rating + r);
                const hat = (0, hat_1.getHat)(rating);
                const profit = rating - dashboard.rating;
                const bestRating = max(dashboard.bestRating, rating);
                const bestProfit = max(dashboard.bestProfit, profit);
                dashboard.set({
                    rating,
                    hat,
                    profit,
                    bestRating,
                    bestProfit,
                    user: c.gambler,
                });
                yield dashboard.save();
                c.set({
                    rating,
                    profit,
                    active: false,
                });
                yield c.save();
                // socket.getIo().emit('result', {
                //     message: 'Results are out for story ' + title,
                // });
            }
        }));
        let rank = 0;
        yield (yield dashboard_1.Dashboard.find().sort({ 'rating': -1 })).forEach((doc) => __awaiter(void 0, void 0, void 0, function* () {
            rank++;
            doc.set({
                ranking: rank,
                bestRanking: doc.bestRanking === 0 ? rank : min(doc.bestRanking, rank),
            });
            yield doc.save();
        }));
    }
    catch (err) {
        throw err;
    }
});
Router.post('/api/story', require_auth_1.requireAuth, story_validator_1.StoryValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { title, text, gallery, hashtags } = req.body;
        const story = story_1.Story.build({
            title, text, gallery, hashtags, author: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
        });
        const { id } = yield story.save();
        const gamble = gamble_1.Gamble.build({
            story: id,
            up: 0,
            down: 0,
            lastfetched: (Math.round(new Date().getTime() / 1000) - 24 * 3600).toString(),
        });
        yield gamble.save();
        const casino = casino_1.Casino.build({
            gambler: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
            gamble: gamble.id,
            type: 'author',
            vote: 'up',
            rating: 0,
            profit: 0,
            active: true,
        });
        yield casino.save();
        try {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () { return yield updateAllDashboards(id, title); }), 1000 * 60 * 10);
        }
        catch (err) {
            throw err;
        }
        res.status(201).send({
            message: 'story created successfully',
            story,
        });
    }
    catch (err) {
        next(err);
    }
}));
