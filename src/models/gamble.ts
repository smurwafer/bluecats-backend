import mongoose from 'mongoose';

interface GambleAttr {
    up: number;
    down: number;
    story: string;
    lastfetched: string;
};

interface GambleModel extends mongoose.Model<GambleDoc> {
    build(attr: GambleAttr): GambleDoc;
};

interface GambleDoc extends mongoose.Document {
    up: number;
    down: number;
    story: string;
    lastfetched: string;
}

const gambleSchema = new mongoose.Schema({
    up: {
        type: Number,
        required: true,
        default: 0,
    },
    down: {
        type: Number,
        required: true,
        default: 0,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    lastfetched: {
        type: String,
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

gambleSchema.statics.build = (attrs: GambleAttr) => {
    return new Gamble(attrs);
}

const Gamble = mongoose.model<GambleDoc, GambleModel>('Gamble', gambleSchema);

export { Gamble };