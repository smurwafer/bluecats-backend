import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Subscription } from '../../models/subscription';
import { SubscriptionValidator } from '../../validators/subscription/subscription-validator';

const Router = express.Router();

Router.post('/api/subscription', requireAuth, SubscriptionValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { channel } = req.body;

        const subscription = Subscription.build({
            channel,
            subscriber: req.currentUser?.id as string,
        });

        await subscription.save();

        res.status(201).send({
            message: 'subscription created successfully',
            subscription,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SubscriptionCreateRouter };