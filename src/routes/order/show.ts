import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Order } from '../../models/order';

const Router = express.Router();

Router.get('/api/order/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);

        if (!order)
            throw new NotFoundError('Order Not Found!');

        res.status(200).send({
            message: 'order retrieved successfully',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderShowRouter };