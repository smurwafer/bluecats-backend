import mongoose from 'mongoose';

interface OrderAttr {
    image: string;
    sketch: string;
    caption: string;
    cost: number;
    user: string;
    address: string;
    needVideo: boolean;
    private: boolean;
    state: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttr): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
    image: string;
    sketch: string;
    caption: string;
    cost: number;
    user: string;
    address: string;
    needVideo: boolean;
    private: boolean;
    state: string;
}

const OrderSchema = new mongoose.Schema({
    image: {
        type: String,
        ref: 'Gallery',
        required: true,
    },
    sketch: {
        type: String,
        ref: 'Gallery',
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    cost: {
        type: Number, 
        required: true,
        default: 0.0,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        ref: 'Address',
        required: true,
    },
    needVideo: {
        type: Boolean,
        default: false,
        required: true,
    },
    private: {
        type: Boolean,
        default: true,
        required: true,
    },
    state: {
        type: String,
        default: 'Ordered',
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

OrderSchema.statics.build = (attrs: OrderAttr) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order, OrderDoc };