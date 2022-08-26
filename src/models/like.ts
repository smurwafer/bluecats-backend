import mongoose from 'mongoose';

interface LikeAttr {
    liker: string;
    stream: string;
};

interface LikeModel extends mongoose.Model<LikeDoc> {
    build(attr: LikeAttr): LikeDoc;
};

interface LikeDoc extends mongoose.Document {
    liker: string;
    stream: string;
}

const likeSchema = new mongoose.Schema({
    liker: {
        type: String,
        ref: 'User',
        required: true,
    },
    stream: {
        type: String,
        ref: 'Stream',
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

likeSchema.statics.build = (attrs: LikeAttr) => {
    return new Like(attrs);
}

const Like = mongoose.model<LikeDoc, LikeModel>('Like', likeSchema);

export { Like };