import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gamble } from '../../models/gamble';

const Router = express.Router();

Router.post('/api/gamble', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
    
        const gamble = Gamble.build({
            story: id,
            up: 0,
            down: 0,
            lastfetched: new Date().toISOString(),
        });
    
        await gamble.save();
    
        res.status(201).send({
            message: 'gamble created successfully',
            gamble,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GambleCreateRouter };