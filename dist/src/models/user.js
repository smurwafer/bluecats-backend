"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    addresses: [{
            type: String,
            ref: 'Address',
            required: false,
        }],
    image: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});
userSchema.statics.build = (attrs) => {
    return new User(attrs);
};
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
