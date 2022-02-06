"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const bookmarkSchema = new mongoose_1.default.Schema({
    bookmarker: {
        type: String,
        ref: 'User',
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    category: {
        type: String,
        required: false,
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
bookmarkSchema.statics.build = (attrs) => {
    return new Bookmark(attrs);
};
const Bookmark = mongoose_1.default.model('Bookmark', bookmarkSchema);
exports.Bookmark = Bookmark;
