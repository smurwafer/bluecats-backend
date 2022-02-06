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
exports.SettingUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const setting_1 = require("../../models/setting");
const Router = express_1.default.Router();
exports.SettingUpdateRouter = Router;
Router.put('/api/setting', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { language, emailOnLogin, notification, showNewContent } = req.body;
        const setting = yield setting_1.Setting.findOne({
            user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
        });
        if (!setting) {
            throw new Error('Settings not found!');
        }
        setting.set({
            language,
            emailOnLogin,
            notification,
            showNewContent,
        });
        yield setting.save();
        res.status(204).send({
            message: "Settings updated successfully!",
            setting,
        });
    }
    catch (err) {
        next(err);
    }
}));
