import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';
import { Gamble } from '../../models/gamble';
import { Vote } from '../../models/vote';

const Router = express.Router();

Router.post('/api/vote', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, id } = req.body;
    
        const vote = Vote.build({
            type, story: id, voter: req.currentUser?.id as string,
        });
    
        await vote.save();

        const gamble = await Gamble.findOne({
            story: id,
        });

        if (!gamble) {
            throw new Error('No such gamble exists!');
        }

        if (type === 'up') {
            gamble.set({
                up: gamble.up + 1,
            });
        } else {
            gamble.set({
                down: gamble.down + 1,
            });
        }

        await gamble.save();

        const casino = Casino.build({
            gambler: req.currentUser?.id as string,
            gamble: gamble.id,
            type: 'voter',
            vote: type,
            rating: 0,
            profit: 0,
            active: true,
        });

        await casino.save();
    
        res.status(201).send({
            message: 'vote created successfully',
            vote,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as VoteCreateRouter };