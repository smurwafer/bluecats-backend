"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const voteSchema = new mongoose_1.default.Schema({
    voter: {
        type: String,
        ref: 'User',
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    type: {
        type: String,
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
voteSchema.statics.build = (attrs) => {
    return new Vote(attrs);
};
const Vote = mongoose_1.default.model('Vote', voteSchema);
exports.Vote = Vote;
