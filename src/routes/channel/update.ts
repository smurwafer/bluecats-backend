import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Channel } from '../../models/channel';
import { ChannelValidator } from '../../validators/channel/channel-validator';

const Router = express.Router();

Router.put('/api/channel/:id', requireAuth, ChannelValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const channel = await Channel.findById(id);

        if (!channel) {
            throw new Error('Channel not found!');
        }

        const userId = req.currentUser?.id;

        if (channel.holders.findIndex(holder => holder === userId) == -1) {
            throw new Error('Not authorized!');
        }

        const { name, description, type, hashtags, photo, theme, holders } = req.body;

        channel.set({
            name, description, type, hashtags, photo, theme, holders, 
        });

        await channel.save();

        res.status(204).send({
            message: 'Channel updated successfully',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelUpdateRouter };