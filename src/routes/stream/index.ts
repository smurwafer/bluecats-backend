import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Stream } from '../../models/stream';

const Router = express.Router();

Router.get('/api/stream', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // /api/stream?channel=channelId

        const streams = await Stream.find({...req.query})
            .populate('gallery')
            .populate('thumbnail')
            .populate({
                path: 'channel',
                populate: [{
                    path: 'photo',
                    model: 'Gallery',
                }, {
                    path: 'theme',
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
            message: 'Streams received successfully',
            streams,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StreamIndexRouter };
