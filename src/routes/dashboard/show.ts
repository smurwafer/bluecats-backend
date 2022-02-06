import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';
import { Dashboard } from '../../models/dashboard';

const Router = express.Router();

Router.get('/api/dashboard/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const dashboard = await Dashboard.findOne({ user: id });

    const casinos = await Casino.find({ gambler: id, active: false }).sort({
        'createdAt': 1,
    });

    const casinoData = [];

    for (let i = 0; i < casinos.length; i++) {
        casinoData.push({
            casino: (i + 1).toString(),
            rating: casinos[i].rating,
        });
    }

    res.status(200).send({
        message: 'dashboard fetched successfully',
        dashboard,
        casinoData,
    });
});

export { Router as DashboardShowRouter };