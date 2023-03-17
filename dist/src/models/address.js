"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AddressSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    house: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
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
AddressSchema.statics.build = (attrs) => {
    return new Address(attrs);
};
const Address = mongoose_1.default.model('Address', AddressSchema);
exports.Address = Address;
