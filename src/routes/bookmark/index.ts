import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Bookmark } from '../../models/bookmark';

const Router = express.Router();

Router.get('/api/bookmark', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookmarks = await Bookmark.find({
            bookmarker: req.currentUser?.id,
        }).populate({
            path: 'story',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        }).populate({
            path: 'story',
            populate: {
                path: 'author',
                model: 'User',
            }
        });
        
        res.status(200).send({
            message: 'bookmark fetched successfully',
            bookmarks,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookmarkIndexRouter };