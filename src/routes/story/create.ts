import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Casino } from '../../models/casino';
import { Dashboard } from '../../models/dashboard';
import { Gamble } from '../../models/gamble';
import { Story } from '../../models/story';
import { getHat } from '../../utility/hat';
import { StoryValidator } from '../../validators/story/story-validator';
import socket from '../../../socket';

const Router = express.Router();

const max = (a: number, b: number) => {
    return a > b ? a : b;
}

const min = (a: number, b: number) => {
    return a < b ? a : b;
}

const updateAllDashboards = async (id: string, title: string) => {
    try {
        const gamble = await Gamble.findOne({
            story: id,
        });
    
        if (!gamble) {
            throw new Error('No such gamble exists');
        }
    
        const casinos = await Casino.find({
            gamble: gamble.id as string,
        });
    
        
        casinos.map(async c => {
            let r = 0;
            // const nextFetchTime = new Date(gamble.lastfetched).getTime();
            // if (new Date().getTime() > nextFetchTime) {
                if (gamble.up > gamble.down) {
                    if (c.type === 'author') {
                        // r += gamble.up / 20;
                        r += gamble.up * 10;
                    } else {
                        if (c.vote === 'up') {
                            // r += gamble.up / 200;
                            r += gamble.up * 2;
                        } else {
                            // r -= gamble.up / 100;
                            r -= gamble.up;
                        }
                    }
                } else if (gamble.up < gamble.down) {
                    if (c.type === 'author') {
                        // r -= gamble.down / 10;
                        r -= gamble.down * 10;
                    } else {
                        if (c.vote === 'up') {
                            // r -= gamble.down / 100;
                            r -= gamble.down * 2;
                        } else {
                            // r += gamble.down / 100;
                            r += gamble.down * 2;
                        }
                    }
                }
            // }

            const dashboard = await Dashboard.findOne({ user: c.gambler });
    
            if (dashboard) {
                const rating: number = Math.round(dashboard.rating + r);
                const hat: string = getHat(rating);
                const profit: number = rating - dashboard.rating;
                const bestRating: number = max(dashboard.bestRating, rating);
                const bestProfit: number = max(dashboard.bestProfit, profit);
            
                dashboard.set({
                    rating,
                    hat,
                    profit,
                    bestRating,
                    bestProfit,
                    user: c.gambler,
                });
            
                await dashboard.save();

                c.set({
                    rating,
                    profit,
                    active: false,
                });

                await c.save();

                // socket.getIo().emit('result', {
                //     message: 'Results are out for story ' + title,
                // });
            }
        });

        let rank:number = 0;

        await (await Dashboard.find().sort({ 'rating': -1 })).forEach(async doc => {
            rank++;
            doc.set({
                ranking: rank,
                bestRanking: doc.bestRanking === 0 ? rank : min(doc.bestRanking, rank),
            });
            await doc.save();
        });

        
    
    } catch (err) {
        throw err;
    }
}

Router.post('/api/story', requireAuth, StoryValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, text, gallery, hashtags } = req.body;
    
        const story = Story.build({
            title, text, gallery, hashtags, author: req.currentUser?.id as string,
        });
    
        const { id } = await story.save();

        const gamble = Gamble.build({
            story: id,
            up: 0,
            down: 0,
            lastfetched: (Math.round(new Date().getTime() / 1000) - 24 * 3600).toString(), 
        });

        await gamble.save();

        const casino = Casino.build({
            gambler: req.currentUser?.id as string,
            gamble: gamble.id,
            type: 'author',
            vote: 'up',
            rating: 0,
            profit: 0,
            active: true,
        });

        await casino.save();

        try {
            setTimeout(async () => await updateAllDashboards(id, title), 1000 * 60 * 10);
        } catch (err) {
            throw err;
        }
    
        res.status(201).send({
            message: 'story created successfully',
            story,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StoryCreateRouter };