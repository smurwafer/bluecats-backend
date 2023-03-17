import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Dashboard } from '../../models/dashboard';

const Router = express.Router();

Router.get('/api/dashboard', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const leaderboard = await Dashboard.find().populate('user').sort({
        'rating': -1,
    }).limit(5);

    res.status(200).send({
        message: 'dashboards fetched successfully',
        leaderboard,
    });
});

export { Router as DashboardIndexRouter };