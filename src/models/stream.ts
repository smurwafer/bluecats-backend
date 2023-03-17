import mongoose from 'mongoose';

export interface StreamAttr {
    title: string;
    description: string;
    type: string;
    gallery: string[];
    thumbnail: number;
    hashtags: string[];
    channel: string;
};

interface StreamModel extends mongoose.Model<StreamDoc> {
    build(attrs: StreamAttr): StreamDoc;
};

interface StreamDoc extends mongoose.Document {
    title: string;
    description: string;
    type: string;
    gallery: string[];
    thumbnail: number;
    hashtags: string[];
    channel: string;
};

const streamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    thumbnail: {
        type: Number,
        required: true,
    },
    hashtags: [{
        type: String,
        required: false,
    }],
    channel: {
        type: String,
        ref: 'Channel',
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

streamSchema.statics.build = (attrs: StreamAttr) => {
    return new Stream(attrs);
};

const Stream = mongoose.model<StreamDoc, StreamModel>('Stream', streamSchema);

export { Stream };