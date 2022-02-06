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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const require_auth_1 = require("../../middlewares/require-auth");
const profile_1 = require("../../models/profile");
const user_1 = require("../../models/user");
const password_validator_1 = require("../../validators/password/password-validator");
const validate_request_1 = require("../../middlewares/validate-request");
const Router = express_1.default.Router();
exports.UserUpdateRouter = Router;
Router.put('/api/user/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.User.findById(id);
        if (!user) {
            throw new Error('No such user exists!');
        }
        const profile = yield profile_1.Profile.findById(user.profile).populate('image').populate('theme');
        if (!profile) {
            throw new Error('No profile found!');
        }
        const { userName, email } = req.body;
        const existingUsers = yield user_1.User.find({ $or: [{ email }, { userName }] });
        if (existingUsers.length > 0) {
            throw new Error('Username and/or email are already occupied!');
        }
        user.set({
            userName, email
        });
        yield user.save();
        res.status(204).send({
            message: 'user updated successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.put('/api/update-password/:id', require_auth_1.requireAuth, password_validator_1.PasswordValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.User.findById(id);
        if (!user) {
            throw new Error('No such user exists!');
        }
        const { oldPassword, newPassword } = req.body;
        const isValid = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isValid) {
            throw new Error('Incorrect old password!');
        }
        const hash = yield bcryptjs_1.default.hash(newPassword, 12);
        user.set({
            password: hash,
        });
        yield user.save();
        res.status(204).send({
            message: 'user password updated successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.put('/api/profile/:id', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const profile = yield profile_1.Profile.findById(id);
        if (!profile) {
            throw new Error('No such profile exists!');
        }
        const { name, bio, age, photo, theme, phone, interests } = req.body;
        profile.set({
            name, bio, age, photo, theme, phone, interests,
        });
        yield profile.save();
        res.status(204).send({
            message: 'profile updated successfully',
            profile,
        });
    }
    catch (err) {
        next(err);
    }
}));
Router.put('/api/online-check', require_auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { online } = req.body;
        const id = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield user_1.User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        console.log('online-check of ' + user.userName, online);
        // const contacts = await Contact.find({
        //     $or: [
        //         { userA: id },
        //         { userB: id }
        //     ]
        // });
        // const rooms = [];
        // for (let key in contacts) {
        //     rooms.push(contacts[key].id);
        // }
        // if (online) {
        //     socket.getIo().socketsJoin(rooms);
        //     socket.getIo().to(rooms).emit('join', {
        //         userName: user.userName,
        //     });
        // } else {
        //     socket.getIo().socketsLeave(rooms);
        //     socket.getIo().to(rooms).emit('leave', {
        //         userName: user.userName,
        //     });
        // }
        user.set({
            online
        });
        yield user.save();
        res.status(204).send({
            message: 'Online check successful',
        });
    }
    catch (err) {
        next(err);
    }
}));
// Hello, This is Manas Kumar from Gurugram, Haryana. Currently pursuing computer engineering from Delhi Technological University(DTU) in New Delhi.
