import express, { Request, Response, NextFunction } from 'express';
import { Comment } from '../../models/comment';

const Router = express.Router();

// here id param is "stream id" 
Router.get('/api/comment/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const comments = await Comment.find({
            stream: id,
        }).populate({
            path: 'commentor',
            populate: {
                path: 'profile',
                model: 'Profile',
                populate: [{
                    path: 'photo',
                    model: 'Gallery',
                }, {
                    path: 'theme',
                    model: 'Gallery',
                }]
            }
        }).sort({ 'createdAt': 1 });

        res.status(200).send({
            message: 'comments fetched successfully',
            comments,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentShowRouter };