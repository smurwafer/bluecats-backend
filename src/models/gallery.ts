import mongoose from 'mongoose';

interface GalleryAttr {
    imageUrl: string;
    videoUrl: string;
    caption: string;
    type: string;
    isResourceUrl: boolean;
};

interface GalleryModel extends mongoose.Model<GalleryDoc> {
    build(attr: GalleryAttr): GalleryDoc;
};

interface GalleryDoc extends mongoose.Document {
    imageUrl: string;
    videoUrl: string;
    caption: string;
    type: string;
    isResourceUrl: boolean;
}

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: false,
    },
    caption: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    isResourceUrl: {
        type: Boolean,
        required: false,
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

gallerySchema.statics.build = (attrs: GalleryAttr) => {
    return new Gallery(attrs);
}

const Gallery = mongoose.model<GalleryDoc, GalleryModel>('Gallery', gallerySchema);

export { Gallery };