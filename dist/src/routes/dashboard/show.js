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
exports.DashboardShowRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const casino_1 = require("../../models/casino");
const dashboard_1 = require("../../models/dashboard");
const Router = express_1.default.Router();
exports.DashboardShowRouter = Router;
Router.get('/api/dashboard/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dashboard = yield dashboard_1.Dashboard.findOne({ user: id });
    const casinos = yield casino_1.Casino.find({ gambler: id, active: false }).sort({
        'createdAt': 1,
    });
    const casinoData = [];
    for (let i = 0; i < casinos.length; i++) {
        casinoData.push({
            casino: (i + 1).toString(),
            rating: casinos[i].rating,
        });
    }
    res.status(200).send({
        message: 'dashboard fetched successfully',
        dashboard,
        casinoData,
    });
}));
