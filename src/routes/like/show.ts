import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Like } from '../../models/like';

const Router = express.Router();

Router.get('/api/is-liked/:stream', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stream = req.params.stream;
        const userId = req.currentUser?.id as string;
        
        const like = await Like.findOne({
            liker: userId,
            stream
        });

        res.status(200).send({
            message: 'like received successfully',
            isLiked: like ? true : false,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LikeShowRoute };