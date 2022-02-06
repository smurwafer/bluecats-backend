import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';

const Router = express.Router();

Router.post('/api/casino', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, type, vote } = req.body;
    
        const casino = Casino.build({
            gambler: req.currentUser?.id as string,
            gamble: id,
            type,
            vote,
            rating: 0,
            profit: 0,
            active: true,
        });
    
        await casino.save();
    
        res.status(201).send({
            message: 'casino created successfully',
            casino,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CasinoCreateRouter };