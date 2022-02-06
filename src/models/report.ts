import mongoose from 'mongoose';

interface ReportAttr {
    title: string;
    text: string;
    story: string;
    gallery: string[];
    reporter: string;
};

interface ReportModel extends mongoose.Model<ReportDoc> {
    build(attrs: ReportAttr): ReportDoc;
};

interface ReportDoc extends mongoose.Document {
    title: string;
    text: string;
    story: string;
    gallery: string[];
    reporter: string;
};

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: false,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    reporter: {
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

reportSchema.statics.build = (attrs: ReportAttr) => {
    return new Report(attrs);
};

const Report = mongoose.model<ReportDoc, ReportModel>('Report', reportSchema);

export { Report };