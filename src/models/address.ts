import mongoose from 'mongoose';

export interface AddressAttr {
    name: string;
    phone: string;
    house: string;
    street: string;
    area: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
}

interface AddressModel extends mongoose.Model<AddressDoc> {
    build(attrs: AddressAttr): AddressDoc;
}

interface AddressDoc extends mongoose.Document {
    name: string;
    phone: string;
    house: string;
    street: string;
    area: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
}

const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    house: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    }
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

AddressSchema.statics.build = (attrs: AddressAttr) => {
    return new Address(attrs);
}

const Address = mongoose.model<AddressDoc, AddressModel>('Address', AddressSchema);

export { Address, AddressDoc };