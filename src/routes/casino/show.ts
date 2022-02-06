import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';

const Router = express.Router();

Router.get('/api/casino/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const casino = await Casino.findOne({
            gamble: id,
            gambler: req.currentUser?.id,
        });

        if (!casino) {
            throw new Error('No such casino exists!');
        }

        res.status(200).send({
            message: 'casino fetched successfully',
            casino,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CasinoShowRouter };