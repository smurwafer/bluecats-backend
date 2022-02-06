import mongoose from 'mongoose';

export interface ChannelAttr {
    name: string;
    description: string;
    type: string;
    gallery: string[];
    hashtags: string[];
    holders: string[];
};

interface ChannelModel extends mongoose.Model<ChannelDoc> {
    build(attrs: ChannelAttr): ChannelDoc;
};

interface ChannelDoc extends mongoose.Document {
    name: string;
    description: string;
    type: string;
    gallery: string[];
    hashtags: string[];
    holders: string[];
};

const channelSchema = new mongoose.Schema({
    name: {
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
    hashtags: [{
        type: String,
        required: false,
    }],
    holders: [{
        type: String,
        ref: 'User',
        required: true,
    }],
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

channelSchema.statics.build = (attrs: ChannelAttr) => {
    return new Channel(attrs);
};

const Channel = mongoose.model<ChannelDoc, ChannelModel>('Channel', channelSchema);

export { Channel };