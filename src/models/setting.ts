import mongoose from 'mongoose';

interface SettingAttr {
    language: string;
    emailOnLogin: boolean;
    notification: boolean;
    showNewContent: boolean;
    user: string;
};

interface SettingModel extends mongoose.Model<SettingDoc> {
    build(attrs: SettingAttr): SettingDoc;
};

interface SettingDoc extends mongoose.Document {
    language: string;
    emailOnLogin: boolean;
    notification: boolean;
    showNewContent: boolean;
    user: string;
};

const settingSchema = new mongoose.Schema({
    language: {
        type: String,
        default: 'english',
        required: true,
    },
    emailOnLogin: {
        type: Boolean,
        default: false,
        required: true,
    },
    notification: {
        type: Boolean,
        default: true,
        required: true,
    },
    showNewContent: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
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

settingSchema.statics.build = (attrs: SettingAttr) => {
    return new Setting(attrs);
};

const Setting = mongoose.model<SettingDoc, SettingModel>('Setting', settingSchema);

export { Setting, SettingDoc };