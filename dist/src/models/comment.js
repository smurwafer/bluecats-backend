"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
;
const commentSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    stream: {
        type: String,
        ref: 'Stream',
        required: true,
    },
    commentor: {
        type: String,
        ref: 'User',
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
commentSchema.statics.build = (attrs) => {
    return new Comment(attrs);
};
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
