import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';

const Router = express.Router();

Router.get('/api/gallery/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const gallery = await Gallery.findById(id);

        console.log(id);
    
        if (!gallery) {
            throw new NotFoundError('No such gallery exists!');
        }
    
        res.status(200).send({
            message: 'gallery fetched successfully',
            gallery,
        });
    } catch (error) {
        next(error);
    }
});

export { Router as GalleryShowRouter };