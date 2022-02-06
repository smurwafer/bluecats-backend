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
exports.CommentDeleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_1 = require("../../models/comment");
const Router = express_1.default.Router();
exports.CommentDeleteRouter = Router;
Router.delete('/api/comment/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const comment = yield comment_1.Comment.findById(id);
        if (!comment) {
            throw new Error('No such comment exists!');
        }
        if (comment.commentor !== ((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error('You are not authorized to delete this comment!');
        }
        yield comment_1.Comment.findByIdAndDelete(id);
        res.status(202).send({
            message: 'comment deleted successfully',
            comment,
        });
    }
    catch (err) {
        next(err);
    }
}));
