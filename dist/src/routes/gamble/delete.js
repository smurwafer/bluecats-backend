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
exports.GambleDeleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const gamble_1 = require("../../models/gamble");
const Router = express_1.default.Router();
exports.GambleDeleteRouter = Router;
Router.delete('/api/gamble/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const gamble = yield gamble_1.Gamble.findOne({
            story: id,
        });
        if (!gamble) {
            throw new Error('No such gamble exists!');
        }
        yield gamble_1.Gamble.findOneAndDelete({
            story: id,
        });
        res.status(202).send({
            message: 'gamble deleted successfully',
            gamble,
        });
    }
    catch (err) {
        next(err);
    }
}));
