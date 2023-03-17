import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Order } from '../../models/order';

const Router = express.Router();

Router.get('/api/order', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find({ user: req.currentUser?.id });
        res.status(200).send({
            message: 'orders retrieved successfully',
            orders,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/all-order', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query;
        let orders;
        if (userId)
            orders = await Order.find({ user: userId });
        else
            orders = await Order.find();
        res.status(200).send({
            message: 'all orders retrieved successfully',
            orders,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderIndexRouter };