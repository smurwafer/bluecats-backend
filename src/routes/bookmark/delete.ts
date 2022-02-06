import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Bookmark } from '../../models/bookmark';

const Router = express.Router();

Router.delete('/api/bookmark/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const bookmark = await Bookmark.findOne({
            bookmarker: req.currentUser?.id,
            story: id,
        });

        if (!bookmark) {
            throw new Error('Bookmark not found!');
        }

        await Bookmark.findOneAndDelete({
            bookmarker: req.currentUser?.id,
            story: id,
        });
        
        res.status(202).send({
            message: 'bookmark deleted successfully',
            bookmark,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookmarkDeleteRouter };