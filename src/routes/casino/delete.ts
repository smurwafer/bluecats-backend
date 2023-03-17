import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';

const Router = express.Router();

Router.delete('/api/casino/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const casino = await Casino.findOne({
            gambler: req.currentUser?.id,
            gamble: id,
        });

        if (!casino) {
            throw new Error('No such casino exists!');
        }

        await Casino.findOneAndDelete({
            gambler: req.currentUser?.id,
            gamble: id,
        });
    
        res.status(202).send({
            message: 'casino deleted successfully',
            casino,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CasinoDeleteRouter };