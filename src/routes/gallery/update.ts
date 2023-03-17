import express, { Request, Response, NextFunction } from 'express';
import { unlink } from 'fs/promises';
import { uploadFile } from '../../../s3';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';

const Router = express.Router();

Router.put('/api/gallery/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { url, caption, type } = req.body;
    
        let modifiedType = GalleryType.IMAGE;
    
        if (type === 'video')
            modifiedType = GalleryType.VIDEO;
    
        const gallery = await Gallery.findById(id);
    
        if (!gallery)
            throw new NotFoundError('No such gallery exists!');
    
        gallery.set({
            url, caption, type: modifiedType,
        });
    
        await gallery.save();
    
        res.status(200).send({
            message: 'gallery updated successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryUpdateRouter };