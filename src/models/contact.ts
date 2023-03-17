import mongoose from 'mongoose';

interface ContactAttr {
    userA: string;
    userB: string;
}

interface ContactModel extends mongoose.Model<ContactDoc> {
    build(attrs: ContactAttr): ContactDoc;
}

interface ContactDoc extends mongoose.Document {
    userA: string;
    userB: string;
}

const contactSchema = new mongoose.Schema({
    userA: {
        type: String,
        ref: 'User',
        required: true,
    },
    userB: {
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

contactSchema.statics.build = (attrs: ContactAttr) => {
    return new Contact(attrs);
}

const Contact = mongoose.model<ContactDoc, ContactModel>('Contact', contactSchema);

export { Contact };