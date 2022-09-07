import mongoose from 'mongoose';

export interface StreamAttr {
    title: string;
    description: string;
    type: string;
    gallery: string[];
    thumbnail: string;
    hashtags: string[];
    channel: string;
    live: boolean;
};

interface StreamModel extends mongoose.Model<StreamDoc> {
    build(attrs: StreamAttr): StreamDoc;
};

interface StreamDoc extends mongoose.Document {
    title: string;
    description: string;
    type: string;
    gallery: string[];
    thumbnail: string;
    hashtags: string[];
    channel: string;
    live: boolean;
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
        type: String,
        ref: 'Gallery',
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
    live: {
        type: Boolean,
        required: false,
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

streamSchema.statics.build = (attrs: StreamAttr) => {
    return new Stream(attrs);
};

const Stream = mongoose.model<StreamDoc, StreamModel>('Stream', streamSchema);

export { Stream };