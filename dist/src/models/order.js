"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    image: {
        type: String,
        ref: 'Gallery',
        required: true,
    },
    sketch: {
        type: String,
        ref: 'Gallery',
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    cost: {
        type: Number,
        required: true,
        default: 0.0,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        ref: 'Address',
        required: true,
    },
    needVideo: {
        type: Boolean,
        default: false,
        required: true,
    },
    private: {
        type: Boolean,
        default: true,
        required: true,
    },
    state: {
        type: String,
        default: 'Ordered',
        required: true,
    },
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
OrderSchema.statics.build = (attrs) => {
    return new Order(attrs);
};
const Order = mongoose_1.default.model('Order', OrderSchema);
exports.Order = Order;
