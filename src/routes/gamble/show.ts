import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gamble } from '../../models/gamble';

const Router = express.Router();

Router.get('/api/gamble/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const gamble = await Gamble.findOne({
            story: id,
        });

        if (!gamble) {
            throw new Error('No such gamble exists!');
        }

        res.status(200).send({
            message: 'gamble fetched successfully',
            gamble,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GambleShowRouter };