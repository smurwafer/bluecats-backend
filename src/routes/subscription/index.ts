import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Subscription } from '../../models/subscription';

const Router = express.Router();

Router.get('/api/subscription', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await Subscription.find({ subscriber: req.currentUser?.id })
            .populate({
                path: 'channel',
                populate: [{
                    path: 'gallery', 
                    model: 'Gallery',
                }, {
                    path: 'holders',
                    model: 'User',
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
                }]
            });

        res.status(200).send({
            message: 'subscriptions received successfully',
            subscriptions,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/is-subscribed/:channel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channel = req.params.channel;

        const subscription = await Subscription.findOne({ channel, subscriber: req.currentUser?.id });

        res.status(200).send({
            message: 'subscription received successfully',
            isSubscribed: subscription ? true : false,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/user-subscriptions/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const subscriptions = await Subscription.find({ subscriber: id })
            .populate({
                path: 'channel',
                populate: [{
                    path: 'gallery', 
                    model: 'Gallery',
                }, {
                    path: 'holders',
                    model: 'User',
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
                }]
            });

        res.status(200).send({
            message: 'user subscriptions received successfully',
            subscriptions,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/channel-subscriptions/:channel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channel = req.params.channel;
        const subscriptions = await Subscription.find({ channel })
            .populate({
                path: 'subscriber',
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
            message: 'channel subscriptions received successfully',
            subscriptions,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SubscriptionIndexRouter };