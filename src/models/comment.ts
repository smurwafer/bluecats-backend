import mongoose from 'mongoose';

interface CommentAttr {
    text: string;
    stream: string;
    commentor: string;
};

interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attrs: CommentAttr): CommentDoc;
};

interface CommentDoc extends mongoose.Document {
    text: string;
    stream: string;
    commentor: string;
};

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    stream: {
        type: String,
        ref: 'Stream',
        required: true,
    },
    commentor: {
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

commentSchema.statics.build = (attrs: CommentAttr) => {
    return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema);

export { Comment };