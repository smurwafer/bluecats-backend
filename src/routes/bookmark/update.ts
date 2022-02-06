import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Bookmark } from '../../models/bookmark';

const Router = express.Router();

Router.put('/api/bookmark/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const { category } = req.body;

        const bookmark = await Bookmark.findOne({
            bookmarker: req.currentUser?.id,
            story: id,
        });

        if (!bookmark) {
            throw new Error('Bookmark not found!');
        }

        bookmark.set({
            category,
        });

        await bookmark.save();
        
        res.status(204).send({
            message: 'bookmark updated successfully',
            bookmark,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookmarkUpdateRouter };