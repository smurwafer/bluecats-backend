import mongoose from 'mongoose';

interface UserAttr {
    userName: string;
    email: string;
    phone: string;
    password: string;
    profile: string;
    online: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    userName: string;
    email: string;
    phone: string;
    password: string;
    profile: string;
    online: boolean;
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        ref: 'Profile',
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
        required: false,
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

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };