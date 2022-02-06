import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';

const Router = express.Router();

Router.delete('/api/gallery/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
    
        const gallery = await Gallery.findById(id);
    
        if (!gallery) {
            throw new Error('No such gallery exists!');
        }
    
        await Gallery.findByIdAndDelete(id);
    
        res.status(202).send({
            message: 'gallery deleted successfully',
            gallery,
        });
    } catch (error) {
        next(error);
    }
});

export { Router as GalleryDeleteRouter };