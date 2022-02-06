import mongoose from 'mongoose';

interface BookmarkAttr {
    bookmarker: string;
    story: string;
    category: string;
};

interface BookmarkModel extends mongoose.Model<BookmarkDoc> {
    build(attr: BookmarkAttr): BookmarkDoc;
};

interface BookmarkDoc extends mongoose.Document {
    bookmarker: string;
    story: string;
    category: string;
}

const bookmarkSchema = new mongoose.Schema({
    bookmarker: {
        type: String,
        ref: 'User',
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    category: {
        type: String,
        required: false,
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

bookmarkSchema.statics.build = (attrs: BookmarkAttr) => {
    return new Bookmark(attrs);
}

const Bookmark = mongoose.model<BookmarkDoc, BookmarkModel>('Bookmark', bookmarkSchema);

export { Bookmark };