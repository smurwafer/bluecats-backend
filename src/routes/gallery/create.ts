import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from 'express';
import { uploadFile } from '../../../s3';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';

const Router = express.Router();

const unlink = util.promisify(fs.unlink);

Router.post('/api/gallery', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { caption, type, url } = req.body;

        console.log('gallery', req.body);
    
        let modifiedType = GalleryType.IMAGE;        
        let modifiedUrl, isResourceUrl = false;

        if (url && url.trim().length > 0) {
            isResourceUrl = true;
            if (type == 'video') {
                modifiedUrl = url;
            } else {
                modifiedUrl = url;
            }
        }
    
        if (type === 'video') {
            modifiedType = GalleryType.VIDEO;
            if (req.files && req.files.length > 0) {
                const file = (req.files as Express.Multer.File[])[0];
                isResourceUrl = false;
                modifiedUrl = file.path as string;
                const result = await uploadFile(file);
                modifiedUrl = 'videos/' + result.Key;
                await unlink(file.path);
            }
        } else {
            if (req.files && req.files.length > 0) {
                const file = (req.files as Express.Multer.File[])[0];
                isResourceUrl = false;
                modifiedUrl = file.path as string;
                const result = await uploadFile(file);
                modifiedUrl = 'images/' + result.Key;
                await unlink(file.path);
            }
        }
    
        const gallery = Gallery.build({
            url: modifiedUrl, caption, type: modifiedType, isResourceUrl
        });
    
        await gallery.save();
    
        res.status(201).send({
            message: 'gallery created successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryCreateRouter };