import mongoose from 'mongoose';

interface ViewAttr {
    stream: string;
    user: string;
}

interface ViewModel extends mongoose.Model<ViewDoc> {
    build(attrs: ViewAttr): ViewDoc;
}

interface ViewDoc extends mongoose.Document {
    stream: string;
    user: string;
}

const viewSchema = new mongoose.Schema({
    stream: {
        type: String,
        ref: 'Stream',
        required: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
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

viewSchema.statics.build = (attrs: ViewAttr) => {
    return new View(attrs);
}

const View = mongoose.model<ViewDoc, ViewModel>('View', viewSchema);

export { View, ViewDoc };