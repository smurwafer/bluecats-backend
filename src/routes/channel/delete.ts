import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.delete('/api/channel/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
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

        await Channel.findByIdAndDelete(id);

        res.status(204).send({
            message: 'Channel deleted successfully',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelDeleteRouter };