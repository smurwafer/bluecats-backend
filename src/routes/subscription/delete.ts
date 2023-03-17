import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Subscription } from '../../models/subscription';

const Router = express.Router();

Router.delete('/api/subscription/:channel', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channel = req.params.channel;

        const subscription = await Subscription.findOne({ channel });

        if (!subscription) {
            throw new Error('Subscription not found!');
        }

        await Subscription.findOneAndDelete({ channel });

        res.status(202).send({
            message: 'subscription deleted successfully',
            subscription,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SubscriptionDeleteRouter };