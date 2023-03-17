import mongoose from 'mongoose';

interface SubscriptionAttr {
    subscriber: string;
    channel: string;
}

interface SubscriptionModel extends mongoose.Model<SubscriptionDoc> {
    build(attrs: SubscriptionAttr): SubscriptionDoc;
}

interface SubscriptionDoc extends mongoose.Document {
    subscriber: string;
    channel: string;
}

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: String,
        ref: 'User',
        required: true,
    },
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

subscriptionSchema.statics.build = (attrs: SubscriptionAttr) => {
    return new Subscription(attrs);
}

const Subscription = mongoose.model<SubscriptionDoc, SubscriptionModel>('Subscription', subscriptionSchema);

export { Subscription };