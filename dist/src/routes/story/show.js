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
exports.StoryShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const story_1 = require("../../models/story");
const Router = express_1.default.Router();
exports.StoryShowRouter = Router;
Router.get('/api/story/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const story = yield story_1.Story.findById(id).populate('author').populate('gallery').sort({ 'createdAt': -1 });
        if (!story) {
            throw new Error('Story not found!');
        }
        res.status(200).send({
            message: 'story fetched successfully',
            story,
        });
    }
    catch (err) {
        next(err);
    }
}));
