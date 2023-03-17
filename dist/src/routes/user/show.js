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
exports.UserShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const user_1 = require("../../models/user");
const Router = express_1.default.Router();
exports.UserShowRouter = Router;
Router.get('/api/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.User.findById(id).populate('profile');
        if (!user) {
            throw new Error('User not found!');
        }
        res.status(200).send({
            message: 'user fetched successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.get('/api/current-user', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.currentUser) {
            throw new Error("Not Authorized!");
        }
        const id = req.currentUser.id;
        const currentUser = yield user_1.User.findById(id).populate('profile');
        if (!currentUser) {
            throw new Error("No such user exists!");
        }
        res.status(200).send({
            message: 'Current user fetched',
            currentUser,
        });
    }
    catch (err) {
        next(err);
    }
}));
