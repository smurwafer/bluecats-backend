import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Order } from '../../models/order';
import { nextState, prevState } from '../../utility/order-state';
import { OrderValidator } from '../../validators/order/order-validator';

const Router = express.Router();

Router.put('/api/order/:id', requireAuth, OrderValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const order = await Order.findById(id);
    
        if (!order)
            throw new NotFoundError('Order Not Found!');

        const { image, sketch, caption, cost, user, address, needVideo, private: pvt } = req.body;
        
        order.set({
            image, sketch, caption, cost, user, address, needVideo, private: pvt
        });

        await order.save();
    
        res.status(204).send({
            message: 'order updated successfully',
            order,
        });
    } catch (err) {
        next(err);
    }
});

Router.put('/api/change-order-state/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { move } = req.query;
        const order = await Order.findById(id);

        if (!order)
            throw new NotFoundError('Order Not Found!');

        const currentState = order.state;
        
        let state;
        if (move == 'backward')
            state = prevState(currentState);
        else
            state = nextState(currentState);

        order.set({
            state
        });

        await order.save();
    
        res.status(204).send({
            message: 'order updated successfully',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderUpdateRouter };