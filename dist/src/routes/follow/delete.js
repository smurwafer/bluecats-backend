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
exports.FollowDeleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const contact_1 = require("../../models/contact");
const follow_1 = require("../../models/follow");
const Router = express_1.default.Router();
exports.FollowDeleteRouter = Router;
Router.delete('/api/follow/:followed', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const followed = req.params.followed;
        const existingFollow = yield follow_1.Follow.findOne({
            $or: [
                {
                    follower: followed,
                    followed: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id
                }
            ]
        });
        let followText = 'follow';
        if (existingFollow) {
            const contact = yield contact_1.Contact.findOne({
                userA: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                userB: followed,
            });
            followText = 'follow back';
            if (!contact) {
                yield contact_1.Contact.findOneAndDelete({
                    userA: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
                    userB: followed,
                });
            }
        }
        const follow = yield follow_1.Follow.findOne({
            follower: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id,
            followed,
        });
        if (!follow) {
            throw new Error('No such follow exists!');
        }
        yield follow_1.Follow.findOneAndDelete({
            follower: (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.id,
            followed,
        });
        res.status(202).send({
            message: 'follow deleted successfully',
            follow,
            followText,
        });
    }
    catch (err) {
        next(err);
    }
}));
