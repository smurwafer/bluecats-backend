import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Channel } from '../../models/channel';
import { ChannelValidator } from '../../validators/channel/channel-validator';

const Router = express.Router();

Router.post('/api/channel', requireAuth, ChannelValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, type, hashtags, photo, theme, holders } = req.body;

        const channel = Channel.build({
            name, description, type, hashtags, photo, theme, holders, 
        });

        await channel.save();

        res.status(201).send({
            message: 'Channel created successfully',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelCreateRouter };