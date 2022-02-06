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
exports.BookmarkUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const bookmark_1 = require("../../models/bookmark");
const Router = express_1.default.Router();
exports.BookmarkUpdateRouter = Router;
Router.put('/api/bookmark/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const { category } = req.body;
        const bookmark = yield bookmark_1.Bookmark.findOne({
            bookmarker: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
            story: id,
        });
        if (!bookmark) {
            throw new Error('Bookmark not found!');
        }
        bookmark.set({
            category,
        });
        yield bookmark.save();
        res.status(204).send({
            message: 'bookmark updated successfully',
            bookmark,
        });
    }
    catch (err) {
        next(err);
    }
}));
