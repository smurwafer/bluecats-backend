import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Bookmark } from '../../models/bookmark';

const Router = express.Router();

Router.post('/api/bookmark', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, category } = req.body;
        
        const bookmark = Bookmark.build({
            bookmarker: req.currentUser?.id as string,
            story: id,
            category,
        });

        await bookmark.save();
        
        res.status(201).send({
            message: 'bookmark created successfully',
            bookmark,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookmarkCreateRouter };