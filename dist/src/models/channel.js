"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
;
const channelSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    hashtags: [{
            type: String,
            required: false,
        }],
    holders: [{
            type: String,
            ref: 'User',
            required: true,
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
channelSchema.statics.build = (attrs) => {
    return new Channel(attrs);
};
const Channel = mongoose_1.default.model('Channel', channelSchema);
exports.Channel = Channel;
