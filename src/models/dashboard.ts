import mongoose from 'mongoose';

interface DashboardAttr {
    user: string;
    rating: number;
    ranking: number;
    hat: string;
    profit: number;
    bestRating: number;
    bestRanking: number;
    bestProfit: number;
}

interface DashboardModel extends mongoose.Model<DashboardDoc> {
    build(attrs: DashboardAttr): DashboardDoc;
}

interface DashboardDoc extends mongoose.Document {
    user: string;
    rating: number;
    ranking: number;
    hat: string;
    profit: number;
    bestRating: number;
    bestRanking: number;
    bestProfit: number;
}

const dashboardSchema = new mongoose.Schema({
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

dashboardSchema.statics.build = (attrs: DashboardAttr) => {
    return new Dashboard(attrs);
}

const Dashboard = mongoose.model<DashboardDoc, DashboardModel>('Dashboard', dashboardSchema);

export { Dashboard };