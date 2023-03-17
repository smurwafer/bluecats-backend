import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Vote } from '../../models/vote';

const Router = express.Router();

Router.get('/api/vote/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const upVotes = await Vote.find({
            story: id,
            type: 'up',
        }).countDocuments();

        const downVotes = await Vote.find({
            story: id,
            type: 'down',
        }).countDocuments();

        const vote = await Vote.findOne({
            story: id,
            voter: req.currentUser?.id,
        });
    
        res.status(200).send({
            message: 'vote count fetched successfully',
            upVotes,
            downVotes,
            vote,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as VoteShowRouter };