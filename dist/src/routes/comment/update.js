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
exports.CommentUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const comment_1 = require("../../models/comment");
const comment_validator_1 = require("../../validators/comment/comment-validator");
const Router = express_1.default.Router();
exports.CommentUpdateRouter = Router;
Router.put('/api/comment/:id', require_auth_1.requireAuth, comment_validator_1.CommentValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const { text, stream } = req.body;
        const comment = yield comment_1.Comment.findById(id);
        if (!comment) {
            throw new Error('No comment found!');
        }
        const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
        if (comment.commentor !== userId) {
            throw new Error('Not authorized to edit this comment!');
        }
        comment.set({
            text, stream, commentor: userId,
        });
        yield comment.save();
        res.status(204).send({
            message: 'comment updated successfully',
            comment,
        });
    }
    catch (err) {
        next(err);
    }
}));
