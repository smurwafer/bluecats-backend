import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.get('/api/channel/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const channel = await Channel.findById(id)
            .populate('gallery')
            .populate({
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

        if (!channel) {
            throw new Error('Channel not found!');
        }

        res.status(200).send({
            message: 'Channel received successfully',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelShowRouter };