import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Channel } from '../../models/channel';
import { Subscription } from '../../models/subscription';

const Router = express.Router();

Router.get('/api/channel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // /api/channel?holder=u3ru33hg3h0g22
        const { holder } = req.query;

        const channels = await Channel.find({ holders: holder }).populate('photo').populate('theme').populate({
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

        // const list = channels.map(async (channel) => {
        //     const subscription = await Subscription.find({ channel: channel.id }).populate('subscriber');
        //     const subscribers = subscription.map(subs => subs.subscriber);
        //     return {
        //         ...channel,
        //         subscribers,
        //     };
        // });

        res.status(200).send({
            message: 'Channels received successfully',
            channels,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelIndexRouter };