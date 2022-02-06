"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
;
const streamSchema = new mongoose_1.default.Schema({
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
    thumbnail: {
        type: Number,
        required: true,
    },
    hashtags: [{
            type: String,
            required: false,
        }],
    channel: {
        type: String,
        ref: 'Channel',
        required: true,
    },
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
streamSchema.statics.build = (attrs) => {
    return new Stream(attrs);
};
const Stream = mongoose_1.default.model('Stream', streamSchema);
exports.Stream = Stream;
