import mongoose from 'mongoose';

export interface StoryAttr {
    title: string;
    text: string;
    gallery: string[];
    hashtags: string[];
    author: string;
};

interface StoryModel extends mongoose.Model<StoryDoc> {
    build(attrs: StoryAttr): StoryDoc;
};

interface StoryDoc extends mongoose.Document {
    title: string;
    text: string;
    gallery: string[];
    hashtags: string[];
    author: string;  
};

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
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
    author: {
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

storySchema.statics.build = (attrs: StoryAttr) => {
    return new Story(attrs);
};

const Story = mongoose.model<StoryDoc, StoryModel>('Story', storySchema);

export { Story };