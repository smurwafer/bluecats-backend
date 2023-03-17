import mongoose from 'mongoose';

interface FollowAttr {
    follower: string;
    followed: string;
}

interface FollowModel extends mongoose.Model<FollowDoc> {
    build(attrs: FollowAttr): FollowDoc;
}

interface FollowDoc extends mongoose.Document {
    follower: string;
    followed: string;
}

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        ref: 'User',
        required: true,
    },
    followed: {
        type: String,
        ref: 'User',
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

followSchema.statics.build = (attrs: FollowAttr) => {
    return new Follow(attrs);
}

const Follow = mongoose.model<FollowDoc, FollowModel>('Follow', followSchema);

export { Follow };