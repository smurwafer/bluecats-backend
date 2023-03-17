import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Casino } from '../../models/casino';
import { Dashboard } from '../../models/dashboard';
import { Gamble } from '../../models/gamble';
import { getHat } from '../../utility/hat';

const Router = express.Router();

const max = (a: Number, b: Number) => {
    return a > b ? a : b;
}

const min = (a: Number, b: Number) => {
    return a < b ? a : b;
}

Router.put('/api/dashboard/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const dashboard = await Dashboard.findOne({ user: id });

    if (!dashboard) {
        throw new Error('No dashboard found');
    }

    const casinos = await Casino.find({
        gambler: req.currentUser?.id,
    });

    let r = 0;

    casinos.map(async c => {
        const gamble = await Gamble.findById(c.gamble);
        if (gamble) {
            const nextFetchTime = new Date(gamble.lastfetched).getTime() + 24 * 3600;
            if (new Date().getTime() > nextFetchTime) {
                if (gamble.up > gamble.down) {
                    if (c.type === 'author') {
                        r += gamble.up / 20;
                    } else {
                        if (c.vote === 'up') {
                            r += gamble.up / 200;
                        } else {
                            r -= gamble.up / 100;
                        }
                    }
                } else if(gamble.up < gamble.down) {
                    if (c.type === 'author') {
                        r -= gamble.down / 10;
                    } else {
                        if (c.vote === 'up') {
                            r -= gamble.down / 100;
                        } else {
                            r += gamble.down / 100;
                        }
                    }
                }
            }
        }
    });

    const rating = dashboard.rating + r;
    const ranking = await Dashboard.find().where('rating').gt(rating).countDocuments();
    const hat = getHat(rating);
    const profit = (r / dashboard.rating) * 100;
    const bestRating = max(dashboard.bestRating, rating);
    const bestRanking = min(dashboard.bestRanking, ranking + 1);
    const bestProfit = max(dashboard.bestProfit, profit);

    dashboard.set({
        rating,
        ranking,
        hat,
        profit,
        bestRating,
        bestRanking,
        bestProfit,
    });

    await dashboard.save();

    res.status(204).send({
        message: 'dashboard updated successfully',
    });
});

export { Router as DashboardUpdateRouter };