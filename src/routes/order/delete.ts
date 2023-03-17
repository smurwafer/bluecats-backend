import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Order } from '../../models/order';

const Router = express.Router();

Router.delete('/api/order/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndDelete(id);

        if (!order)
            throw new NotFoundError('Order Not Found!');

        res.status(204).send({
            message: 'order deleted successfully',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderDeleteRouter };