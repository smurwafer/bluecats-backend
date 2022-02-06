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
exports.FollowShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const follow_1 = require("../../models/follow");
const Router = express_1.default.Router();
exports.FollowShowRouter = Router;
Router.get('/api/follow/is-following/:followed', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const followed = req.params.followed;
        const id = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
        const followingTheUser = yield follow_1.Follow.findOne({
            follower: id,
            followed,
        });
        const userFollowingMe = yield follow_1.Follow.findOne({
            follower: followed,
            followed: id,
        });
        let followText = 'follow';
        if (followingTheUser && userFollowingMe) {
            followText = 'contact';
        }
        else if (followingTheUser) {
            followText = 'following';
        }
        else if (userFollowingMe) {
            followText = 'follow back';
        }
        else {
            followText = 'follow';
        }
        res.status(200).send({
            message: 'follows fetched successfully',
            isFollowing: followingTheUser !== null,
            followText,
        });
    }
    catch (err) {
        next(err);
    }
}));
