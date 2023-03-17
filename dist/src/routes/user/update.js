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
exports.UserUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const require_auth_1 = require("../../middlewares/require-auth");
const not_found_error_1 = require("../../exceptions/not-found-error");
const invalid_request_error_1 = require("../../exceptions/invalid-request-error");
const Router = express_1.default.Router();
exports.UserUpdateRouter = Router;
Router.put('/api/user/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.User.findById(id);
        if (!user)
            throw new not_found_error_1.NotFoundError('User Not Found!');
        const { email, phone, name, password, addresses, image, isAdmin } = req.body;
        const existingUser = yield user_1.User.findOne({ $or: [{ email }, { phone }], _id: { $ne: id } });
        if (existingUser)
            throw new invalid_request_error_1.InvalidRequestError('User already exists');
        user.set({
            email, phone, name, password, addresses, image, isAdmin
        });
        yield user.save();
        res.status(204).send({
            message: 'User updated successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
}));
