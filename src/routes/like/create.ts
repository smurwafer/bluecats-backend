import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Like } from '../../models/like';
import { LikeValidator } from '../../validators/like/like-validator';

const Router = express.Router();

Router.post('/api/like', requireAuth, LikeValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stream } = req.body;
    
        const userId = req.currentUser?.id as string;

        const like = Like.build({
            liker: userId,
            stream,
        });
    
        await like.save();

        res.status(201).send({
            message: 'like created successfully',
            like,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LikeCreateRoute };