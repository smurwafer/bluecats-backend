import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';

const Router = express.Router();

Router.get('/api/gallery/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const gallery = await Gallery.findById(id);
    
        if (!gallery) {
            throw new Error('No such gallery exists!');
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