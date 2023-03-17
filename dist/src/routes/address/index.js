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
exports.AddressIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const address_1 = require("../../models/address");
const Router = express_1.default.Router();
exports.AddressIndexRouter = Router;
Router.get('/api/address', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addresses = yield address_1.Address.find();
        res.status(200).send({
            message: 'addresses retrieved successfully',
            addresses,
        });
    }
    catch (err) {
        next(err);
    }
}));
