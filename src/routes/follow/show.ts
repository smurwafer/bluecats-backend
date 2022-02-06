import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Follow } from '../../models/follow';

const Router = express.Router();

Router.get('/api/follow/is-following/:followed', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followed = req.params.followed;
        const id = req.currentUser?.id;
    
        const followingTheUser = await Follow.findOne({
            follower: id,
            followed,
        });

        const userFollowingMe = await Follow.findOne({
            follower: followed,
            followed: id,
        });

        let followText: string = 'follow';
        
        if (followingTheUser && userFollowingMe) {
            followText = 'contact';
        } else if (followingTheUser) {
            followText = 'following';
        } else if (userFollowingMe) {
            followText = 'follow back';
        } else {
            followText = 'follow';
        }

        res.status(200).send({
            message: 'follows fetched successfully',
            isFollowing: followingTheUser !== null,
            followText,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FollowShowRouter };