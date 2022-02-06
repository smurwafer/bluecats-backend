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
exports.FollowCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const contact_1 = require("../../models/contact");
const follow_1 = require("../../models/follow");
const Router = express_1.default.Router();
exports.FollowCreateRouter = Router;
Router.post('/api/follow', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { followed } = req.body;
        const existingFollow = yield follow_1.Follow.findOne({
            $or: [
                {
                    follower: followed,
                    followed: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id
                }
            ]
        });
        let followText = 'following';
        if (existingFollow) {
            const contact = contact_1.Contact.build({
                userA: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                userB: followed,
            });
            followText = 'contact';
            yield contact.save();
        }
        const follow = follow_1.Follow.build({
            follower: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
            followed,
        });
        yield follow.save();
        res.status(201).send({
            message: 'follow created successfully',
            followText,
        });
    }
    catch (err) {
        next(err);
    }
}));
