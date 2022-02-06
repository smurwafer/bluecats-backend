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
exports.VoteDeleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const gamble_1 = require("../../models/gamble");
const vote_1 = require("../../models/vote");
const Router = express_1.default.Router();
exports.VoteDeleteRouter = Router;
Router.delete('/api/vote/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = req.params.id;
        const vote = yield vote_1.Vote.findOne({
            story: id,
            voter: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
        });
        if (!vote) {
            throw new Error('No such vote exists!');
        }
        yield vote_1.Vote.findOneAndDelete({
            story: id,
            voter: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
        });
        const gamble = yield gamble_1.Gamble.findOne({
            story: id,
        });
        if (!gamble) {
            throw new Error('No such gamble exists!');
        }
        if (vote.type === 'up') {
            gamble.set({
                up: gamble.up - 1,
            });
        }
        else {
            gamble.set({
                down: gamble.down - 1,
            });
        }
        yield gamble.save();
        res.status(202).send({
            message: 'unvoted successfully',
        });
    }
    catch (err) {
        next(err);
    }
}));
