import mongoose from 'mongoose';

interface CasinoAttr {
    gambler: string;
    gamble: string;
    type: string;
    vote: string;
    rating: number;
    profit: number;
    active: boolean;
};

interface CasinoModel extends mongoose.Model<CasinoDoc> {
    build(attr: CasinoAttr): CasinoDoc;
};

interface CasinoDoc extends mongoose.Document {
    gambler: string;
    gamble: string;
    type: string;
    vote: string;
    rating: number;
    profit: number;
    active: boolean;
}

const casinoSchema = new mongoose.Schema({
    gambler: {
        type: String,
        ref: 'User',
        required: true,
    },
    gamble: {
        type: String,
        ref: 'Gamble',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    vote: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    }
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

casinoSchema.statics.build = (attrs: CasinoAttr) => {
    return new Casino(attrs);
}

const Casino = mongoose.model<CasinoDoc, CasinoModel>('Casino', casinoSchema);

export { Casino };