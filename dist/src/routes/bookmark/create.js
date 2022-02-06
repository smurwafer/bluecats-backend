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
exports.BookmarkCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const bookmark_1 = require("../../models/bookmark");
const Router = express_1.default.Router();
exports.BookmarkCreateRouter = Router;
Router.post('/api/bookmark', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, category } = req.body;
        const bookmark = bookmark_1.Bookmark.build({
            bookmarker: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
            story: id,
            category,
        });
        yield bookmark.save();
        res.status(201).send({
            message: 'bookmark created successfully',
            bookmark,
        });
    }
    catch (err) {
        next(err);
    }
}));
