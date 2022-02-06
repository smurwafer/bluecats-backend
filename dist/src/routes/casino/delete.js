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
exports.CasinoDeleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const casino_1 = require("../../models/casino");
const Router = express_1.default.Router();
exports.CasinoDeleteRouter = Router;
Router.delete('/api/casino/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = req.params.id;
        const casino = yield casino_1.Casino.findOne({
            gambler: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
            gamble: id,
        });
        if (!casino) {
            throw new Error('No such casino exists!');
        }
        yield casino_1.Casino.findOneAndDelete({
            gambler: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
            gamble: id,
        });
        res.status(202).send({
            message: 'casino deleted successfully',
            casino,
        });
    }
    catch (err) {
        next(err);
    }
}));
