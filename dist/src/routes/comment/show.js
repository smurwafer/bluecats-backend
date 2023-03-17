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
exports.CommentShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_1 = require("../../models/comment");
const Router = express_1.default.Router();
exports.CommentShowRouter = Router;
Router.get('/api/comment/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const comments = yield comment_1.Comment.find({
            stream: id,
        }).populate('commentor');
        res.status(200).send({
            message: 'comments fetched successfully',
            comments,
        });
    }
    catch (err) {
        next(err);
    }
}));
