"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dashboardSchema = new mongoose_1.default.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    ranking: {
        type: Number,
        required: true,
        default: 0,
    },
    hat: {
        type: String,
        required: true,
        default: 'black',
    },
    profit: {
        type: Number,
        required: true,
        default: 0,
    },
    bestRating: {
        type: Number,
        required: true,
        default: 0,
    },
    bestRanking: {
        type: Number,
        required: true,
        default: 0,
    },
    bestProfit: {
        type: Number,
        required: true,
        default: 0,
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
dashboardSchema.statics.build = (attrs) => {
    return new Dashboard(attrs);
};
const Dashboard = mongoose_1.default.model('Dashboard', dashboardSchema);
exports.Dashboard = Dashboard;
