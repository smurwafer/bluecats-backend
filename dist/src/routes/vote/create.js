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
exports.VoteCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const casino_1 = require("../../models/casino");
const gamble_1 = require("../../models/gamble");
const vote_1 = require("../../models/vote");
const Router = express_1.default.Router();
exports.VoteCreateRouter = Router;
Router.post('/api/vote', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { type, id } = req.body;
        const vote = vote_1.Vote.build({
            type, story: id, voter: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
        });
        yield vote.save();
        const gamble = yield gamble_1.Gamble.findOne({
            story: id,
        });
        if (!gamble) {
            throw new Error('No such gamble exists!');
        }
        if (type === 'up') {
            gamble.set({
                up: gamble.up + 1,
            });
        }
        else {
            gamble.set({
                down: gamble.down + 1,
            });
        }
        yield gamble.save();
        const casino = casino_1.Casino.build({
            gambler: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
            gamble: gamble.id,
            type: 'voter',
            vote: type,
            rating: 0,
            profit: 0,
            active: true,
        });
        yield casino.save();
        res.status(201).send({
            message: 'vote created successfully',
            vote,
        });
    }
    catch (err) {
        next(err);
    }
}));
