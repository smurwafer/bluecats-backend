"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    theme: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    interests: [{
            type: String,
            required: false,
        }],
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});
profileSchema.statics.build = (attrs) => {
    return new Profile(attrs);
};
const Profile = mongoose_1.default.model('Profile', profileSchema);
exports.Profile = Profile;
