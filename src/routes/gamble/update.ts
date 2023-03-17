import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gamble } from '../../models/gamble';

const Router = express.Router();

Router.put('/api/gamble', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, up, down } = req.body;

        const gamble = await Gamble.findOne({
            story: id,
        });

        if (!gamble) {
            throw new Error('No such gamble exists!');
        }

        gamble.set({
            up,
            down,
        });

        await gamble.save();
    
        res.status(204).send({
            message: 'gamble updated successfully',
            gamble,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GambleUpdateRouter };