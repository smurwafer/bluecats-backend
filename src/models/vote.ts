import mongoose from 'mongoose';

interface VoteAttr {
    voter: string;
    story: string;
    type: string;
};

interface VoteModel extends mongoose.Model<VoteDoc> {
    build(attr: VoteAttr): VoteDoc;
};

interface VoteDoc extends mongoose.Document {
    voter: string;
    story: string;
    type: string;
}

const voteSchema = new mongoose.Schema({
    voter: {
        type: String,
        ref: 'User',
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    type: {
        type: String,
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

voteSchema.statics.build = (attrs: VoteAttr) => {
    return new Vote(attrs);
}

const Vote = mongoose.model<VoteDoc, VoteModel>('Vote', voteSchema);

export { Vote };