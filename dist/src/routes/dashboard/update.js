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
exports.DashboardUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const casino_1 = require("../../models/casino");
const dashboard_1 = require("../../models/dashboard");
const gamble_1 = require("../../models/gamble");
const hat_1 = require("../../utility/hat");
const Router = express_1.default.Router();
exports.DashboardUpdateRouter = Router;
const max = (a, b) => {
    return a > b ? a : b;
};
const min = (a, b) => {
    return a < b ? a : b;
};
Router.put('/api/dashboard/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const dashboard = yield dashboard_1.Dashboard.findOne({ user: id });
    if (!dashboard) {
        throw new Error('No dashboard found');
    }
    const casinos = yield casino_1.Casino.find({
        gambler: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
    });
    let r = 0;
    casinos.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        const gamble = yield gamble_1.Gamble.findById(c.gamble);
        if (gamble) {
            const nextFetchTime = new Date(gamble.lastfetched).getTime() + 24 * 3600;
            if (new Date().getTime() > nextFetchTime) {
                if (gamble.up > gamble.down) {
                    if (c.type === 'author') {
                        r += gamble.up / 20;
                    }
                    else {
                        if (c.vote === 'up') {
                            r += gamble.up / 200;
                        }
                        else {
                            r -= gamble.up / 100;
                        }
                    }
                }
                else if (gamble.up < gamble.down) {
                    if (c.type === 'author') {
                        r -= gamble.down / 10;
                    }
                    else {
                        if (c.vote === 'up') {
                            r -= gamble.down / 100;
                        }
                        else {
                            r += gamble.down / 100;
                        }
                    }
                }
            }
        }
    }));
    const rating = dashboard.rating + r;
    const ranking = yield dashboard_1.Dashboard.find().where('rating').gt(rating).countDocuments();
    const hat = (0, hat_1.getHat)(rating);
    const profit = (r / dashboard.rating) * 100;
    const bestRating = max(dashboard.bestRating, rating);
    const bestRanking = min(dashboard.bestRanking, ranking + 1);
    const bestProfit = max(dashboard.bestProfit, profit);
    dashboard.set({
        rating,
        ranking,
        hat,
        profit,
        bestRating,
        bestRanking,
        bestProfit,
    });
    yield dashboard.save();
    res.status(204).send({
        message: 'dashboard updated successfully',
    });
}));
