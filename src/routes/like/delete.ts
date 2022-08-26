import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Like } from '../../models/like';

const Router = express.Router();

Router.delete('/api/like/:stream', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stream = req.params.stream;
        const userId = req.currentUser?.id as string;
        
        const like = await Like.findOne({
            liker: userId,
            stream
        });

        if (!like) {
            throw new Error('No like found!');
        }

        await Like.findOneAndDelete({
            liker: userId,
            stream,
        });

        res.status(202).send({
            message: 'like deleted successfully',
            like,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LikeDeleteRoute };