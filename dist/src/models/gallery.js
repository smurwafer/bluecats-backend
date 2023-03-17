"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const gallerySchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    isResourceUrl: {
        type: Boolean,
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
gallerySchema.statics.build = (attrs) => {
    return new Gallery(attrs);
};
const Gallery = mongoose_1.default.model('Gallery', gallerySchema);
exports.Gallery = Gallery;
