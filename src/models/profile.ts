import mongoose from 'mongoose';

interface ProfileAttr {
    name: string;
    phone: string;
    photo: string;
    theme: string;
    bio: string;
    age: number;
    interests: string[];
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
    build(attrs: ProfileAttr): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
    name: string;
    phone: string;
    photo: string;
    theme: string;
    bio: string;
    age: number;
    interests: string[];
}

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    theme: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    interests: [{
        type: String,
        required: false,
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

profileSchema.statics.build = (attrs: ProfileAttr) => {
    return new Profile(attrs);
}

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile };