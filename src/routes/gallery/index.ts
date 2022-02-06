import express, { Request, Response, NextFunction } from 'express';
import { getFileStream } from '../../../s3';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';

const Router = express.Router();

Router.get('/api/gallery', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const galleries = await Gallery.find();

    res.status(200).send({
        message: 'galleries fetched successfully',
        galleries,
    });
});

Router.get('/images/:key', (req: Request, res: Response) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
});

export { Router as GalleryIndexRouter };