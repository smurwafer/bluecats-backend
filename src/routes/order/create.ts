import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Order } from '../../models/order';
import { OrderState } from '../../utility/order-state';
import { OrderValidator } from '../../validators/order/order-validator';

const Router = express.Router();

Router.post('/api/order', requireAuth, OrderValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { image, sketch, caption, cost, user, address, needVideo, private : pvt } = req.body;

        const order = Order.build({
            image, sketch, caption, cost, user, address, needVideo, private : pvt, state : OrderState.BOOKED,
        });
        await order.save();
    
        res.status(201).send({
            message: 'order created successfully',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderCreateRouter };