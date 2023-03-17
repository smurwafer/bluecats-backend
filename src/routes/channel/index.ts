import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.get('/api/channel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channels = await Channel.find().populate('gallery').populate({
            path: 'holders',
            populate: {
                path: 'profile',
                model: 'Profile',
                populate: [{
                    path: 'photo',
                    model: 'Gallery',
                }, {
                    path: 'theme',
                    model: 'Gallery',
                }],
            }
        });

        res.status(200).send({
            message: 'Channels received successfully',
            channels,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelIndexRouter };