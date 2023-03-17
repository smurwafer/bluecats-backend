import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gamble } from '../../models/gamble';
import { Vote } from '../../models/vote';

const Router = express.Router();

Router.delete('/api/vote/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const vote = await Vote.findOne({
            story: id,
            voter: req.currentUser?.id,
        });
        
        if (!vote) {
            throw new Error('No such vote exists!');
        }
        
        await Vote.findOneAndDelete({
            story: id,
            voter: req.currentUser?.id,
        });

        const gamble = await Gamble.findOne({
            story: id,
        });

        if (!gamble) {
            throw new Error('No such gamble exists!');
        }

        if (vote.type === 'up') {
            gamble.set({
                up: gamble.up - 1,
            });
        } else {
            gamble.set({
                down: gamble.down - 1,
            });
        }

        await gamble.save();
        
        res.status(202).send({
            message: 'unvoted successfully',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as VoteDeleteRouter };