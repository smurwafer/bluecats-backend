import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Bookmark } from '../../models/bookmark';

const Router = express.Router();

Router.get('/api/bookmark/is-bookmarked/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const bookmark = await Bookmark.findOne({
            bookmarker: req.currentUser?.id,
            story: id,
        });

        const isBookmarked: boolean = bookmark !== null;
        
        res.status(200).send({
            message: 'bookmark fetched successfully',
            isBookmarked,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookmarkShowRouter };