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
exports.UserIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const user_1 = require("../../models/user");
const contact_1 = require("../../models/contact");
const Router = express_1.default.Router();
exports.UserIndexRouter = Router;
Router.get('/api/user', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const page = parseInt(req.query.page);
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const users = yield user_1.User.find({ _id: { $ne: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id } }).populate({
        path: 'profile',
        populate: [{
                path: 'photo',
                model: 'Gallery',
            }, {
                path: 'theme',
                model: 'Gallery',
            }],
    }).skip(offset).limit(perPage);
    res.status(200).send({
        message: 'users fetched successfully',
        users,
    });
}));
Router.get('/api/online-users', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id;
        const contacts = yield contact_1.Contact.find({
            $or: [
                { userA: id },
                { userB: id },
            ]
        }).populate('userA').populate('userB');
        res.status(200).send({
            message: "Online users fetched successfully!",
            onlineUsers: contacts,
        });
    }
    catch (err) {
        next(err);
    }
}));
