import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Follow } from '../../models/follow';

const Router = express.Router();

Router.get('/api/follow/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
    
        const follows = await Follow.find({
            $or: [
                { follower: id },
            ]
        }).populate('follower').populate('followed').sort({
            'createdAt': -1,
        });

        res.status(200).send({
            message: 'follows fetched successfully',
            follows,
        });
    } catch (err) {
        next(err);
    }
});


export { Router as FollowIndexRouter };