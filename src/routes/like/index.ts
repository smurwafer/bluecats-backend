import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Like } from '../../models/like';

const Router = express.Router();

Router.get('/api/like/:stream', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stream = req.params.stream;
        
        const likes = await Like.find({
            stream
        }).populate({
            path: 'liker',
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
        }).sort({ createdAt: -1 });

        res.status(200).send({
            message: 'likes received successfully',
            likes,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LikeIndexRoute };